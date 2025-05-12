"use client";

import { useEffect } from "react";

type ServerErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  serverReportSent?: boolean;
};

export default function ServerError({
  error,
  reset,
  serverReportSent = false,
}: ServerErrorProps) {
  useEffect(() => {
    // If the server already reported the error, no need to report again
    if (!serverReportSent) {
      console.error(
        "Server error not pre-reported, would handle client-side reporting here:",
        error,
      );
      // Note: In a real app, you might want to add additional client-side reporting
      // if the server reporting failed for some reason
    }
  }, [error, serverReportSent]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-extrabold text-orange-600">
            Server Error
          </h2>
          <p className="mb-6 text-gray-600">
            {error.message || "A server-side error has occurred"}
          </p>
          <div className="mb-4 text-sm text-gray-500">
            {error.digest && <p>Error ID: {error.digest}</p>}
          </div>
          <button
            onClick={reset}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
