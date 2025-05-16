import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
  className = "",
}) => {
  return (
    <Pagination className={`justify-end ${className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              !hasPrevPage ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          let pageNum = currentPage;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={pageNum === currentPage}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              !hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
