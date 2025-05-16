import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination, Meta, SortInput, Maybe } from "@/types/gql/graphql";
import { logger } from "@untools/logger";
import { useDebounce } from "@/hooks/useDebounce";

export interface QueryResult<D> {
  data?: Maybe<Maybe<D>[]> | undefined;
  meta?: Maybe<Meta> | undefined;
}

export interface BaseServiceOptions<F> {
  pagination?: Pagination;
  sort?: SortInput;
  filters?: F;
}

export interface PaginatedQueryOptions<F, D> {
  service: {
    getData: (options: BaseServiceOptions<F>) => Promise<QueryResult<D>>;
  };
  state?: {
    setState?: (state: QueryResult<D>) => void;
    getState?: () => QueryResult<D> | null;
  };
  initialFilters?: F;
  initialSort?: BaseServiceOptions<F>["sort"];
  initialPagination?: BaseServiceOptions<F>["pagination"];
  debounceTime?: number;
}

export const usePaginatedQuery = <F, D>({
  service,
  initialFilters,
  initialPagination = { page: 1, limit: 10 },
  initialSort,
  debounceTime = 500,
  state,
}: PaginatedQueryOptions<F, D>) => {
  const [data, setData] = useState<QueryResult<D>>(
    state?.getState?.() || {
      data: [],
      meta: {
        page: 1,
        limit: 10,
        pages: 1,
        total: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
  );

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<F>(initialFilters as F);
  const [pagination, setPagination] = useState(initialPagination);
  const [sort, setSort] = useState(initialSort);

  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  // Track if a request is in progress
  const requestInProgress = useRef(false);

  const debouncedFilters = useDebounce(filters, debounceTime);

  // Stable reference to service
  const serviceRef = useRef(service);
  useEffect(() => {
    serviceRef.current = service;
  }, [service]);

  const fetchData = useCallback(async () => {
    // Prevent concurrent requests and don't fetch if unmounted
    if (requestInProgress.current || !isMounted.current) return;

    requestInProgress.current = true;
    setIsLoading(true);

    logger.debug("Calling service");

    let result;

    try {
      logger.debug("Calling service");
      result = await serviceRef.current.getData({
        pagination,
        sort,
        filters: debouncedFilters,
      });

      if (isMounted.current) {
        setData(result);
        state?.setState?.(result);
      }
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      requestInProgress.current = false;
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [pagination, sort, debouncedFilters]);

  // Handle cleanup
  useEffect(() => {
    // Reset both flags on mount
    isMounted.current = true;
    requestInProgress.current = false;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset pagination when filters change
  useEffect(() => {
    // When filters change, reset to page 1
    if (pagination.page !== 1) {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedFilters, pagination.page]);

  useEffect(() => {
    logger.debug({
      requestInProgress: requestInProgress.current,
      isMounted: isMounted.current,
      data,
    });
  }, [data]);

  useEffect(() => {
    logger.debug({
      data,
      isLoading,
    });
  }, [data, isLoading]);

  return {
    data,
    isLoading,
    setFilters: useCallback((value: React.SetStateAction<F>) => {
      setFilters(value);
    }, []),
    setPagination: useCallback((value: React.SetStateAction<Pagination>) => {
      setPagination(value);
    }, []),
    setSort: useCallback(
      (value: React.SetStateAction<SortInput | undefined>) => {
        setSort(value);
      },
      [],
    ),
    refresh: fetchData,
  };
};
