"use client";

import {
  HomeIcon,
  InformationDiamondIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface ErrorPageProps {
  error?: {
    message?: string;
    stack?: string;
    digest?: string;
  };
  resetError?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  error = { message: "An unexpected error occurred" },
  resetError,
}) => {
  const emailBody = `
Digest:
${error.digest ?? "N/A"}

Stack:
${error.stack ?? "N/A"}
`;

  return (
    <section className="site-section flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="wrapper">
        {/* Main Error Alert */}
        <div className="mb-8 rounded-2xl bg-red-50 p-6 text-red-800 dark:bg-red-800 dark:text-red-200">
          <div className="flex items-center gap-4">
            {/* Error Icon */}
            <div className="flex-shrink-0">
              <HugeiconsIcon
                className="icon h-12 w-12 text-red-800 dark:text-red-200"
                icon={InformationDiamondIcon}
                color="currentColor"
                strokeWidth={2}
              />
            </div>

            <div className="flex flex-col gap-0">
              <h1 className="text-lg font-medium text-red-800 dark:text-red-200">
                Something went wrong
              </h1>
              <p className="text-red-700 dark:text-red-200">{error.message}</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Suggestions */}
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-200">
              What you can try:
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Refresh the page to see if the error resolves
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Check your internet connection
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Return to the homepage and try again
              </li>
              {error.stack && (
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  If the problem persists, contact support with this error
                  information
                </li>
              )}
            </ul>
          </div>

          {/* Technical Details */}
          {error.stack && (
            <div className="mb-6">
              <details className="group">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                  Technical Details
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-gray-50 p-4 text-xs whitespace-pre-wrap text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {error.stack}
                </pre>
              </details>
            </div>
          )}

          {/* Digest */}
          {error.digest && (
            <div className="mb-6">
              <details className="group">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                  Digest
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-gray-50 p-4 text-xs whitespace-pre-wrap text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {error.digest}
                </pre>
              </details>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {resetError && (
              <button onClick={resetError} className="btn primary">
                Try Again
              </button>
            )}
            {error.digest ||
              (error.stack && (
                <Link
                  href={`mailto:support@100pay.co?subject=Error Report&body=${encodeURIComponent(emailBody)}`}
                  className="btn secondary"
                >
                  <HugeiconsIcon
                    className="icon"
                    icon={Mail01Icon}
                    color="currentColor"
                    strokeWidth={2}
                  />
                  <span>Contact Support</span>
                </Link>
              ))}
            <Link href="/" className="btn secondary">
              <HugeiconsIcon
                className="icon"
                icon={HomeIcon}
                color="currentColor"
                strokeWidth={2}
              />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
