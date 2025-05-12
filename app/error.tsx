"use client";

import { mailNotifier } from "@/utils/mailNotifier";
import { logger } from "@untools/logger";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { marked } from "marked";
import ErrorPage from "@/components/Error/Page";
import { useUserStore } from "@/store/useUserStore";

// Define props type for the Error component
type ErrorProps = {
  error: Error & { digest?: string; stack?: string; cause?: unknown };
  reset: () => void;
};

const SUPPORT_MAIL = process.env.NEXT_PUBLIC_SUPPORT_MAIL || "";

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUserStore();

  useEffect(() => {
    // Collect detailed error information
    const collectErrorMetadata = (): Record<string, string> => {
      const metadata: Record<string, string> = {};

      // Error details
      metadata.errorName = error.name || "Unknown";
      metadata.errorMessage = error.message || "No message provided";
      metadata.errorDigest = error.digest || "No digest";

      // Include error stack trace (if available)
      if (error.stack) {
        metadata.errorStack = error.stack.split("\n").slice(0, 10).join("\n");
      }

      // Include error cause (if available)
      if (error.cause) {
        try {
          metadata.errorCause = JSON.stringify(error.cause);
        } catch {
          metadata.errorCause = String(error.cause);
        }
      }

      // user data info
      metadata.email = user?.email || "";
      metadata.userId = user?.id || "";

      // Navigation data
      metadata.url = window.location.href;
      metadata.path = pathname || "unknown";
      metadata.referrer = document.referrer || "direct";
      metadata.queryParams = searchParams
        ? Array.from(searchParams.entries())
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        : "none";

      // User agent info
      metadata.userAgent = navigator.userAgent;
      metadata.platform = navigator.platform;
      metadata.language = navigator.language;
      metadata.viewport = `${window.innerWidth}x${window.innerHeight}`;
      metadata.screenSize = `${window.screen.width}x${window.screen.height}`;
      metadata.pixelRatio = window.devicePixelRatio.toString();

      // Timing information
      metadata.timestamp = new Date().toISOString();
      metadata.timezoneOffset = new Date().getTimezoneOffset().toString();

      // Performance metrics if available
      if (window.performance) {
        try {
          const navEntry = performance.getEntriesByType(
            "navigation",
          )[0] as PerformanceNavigationTiming;
          if (navEntry) {
            metadata.pageLoadTime = navEntry.loadEventEnd.toString();
            metadata.domInteractive = navEntry.domInteractive.toString();
            metadata.connectionType =
              (
                navigator as Navigator & {
                  connection?: { effectiveType?: string };
                }
              ).connection?.effectiveType || "unknown";
          }
        } catch (e) {
          metadata.performanceError =
            "Failed to collect performance data: " + e;
        }
      }

      // Application state
      metadata.localStorage = localStorage.length.toString();
      metadata.sessionStorage = sessionStorage.length.toString();
      metadata.cookiesEnabled = navigator.cookieEnabled.toString();

      // Memory info if available
      if ("memory" in performance) {
        try {
          metadata.jsHeapSizeLimit = (
            performance as Performance & {
              memory: {
                jsHeapSizeLimit: string;
                totalJSHeapSize: number;
                usedJSHeapSize: number;
              };
            }
          ).memory.jsHeapSizeLimit;
          metadata.totalJSHeapSize = (
            performance as Performance & {
              memory: {
                jsHeapSizeLimit: number;
                totalJSHeapSize: string;
                usedJSHeapSize: number;
              };
            }
          ).memory.totalJSHeapSize;
          metadata.usedJSHeapSize = (
            performance as Performance & {
              memory: {
                jsHeapSizeLimit: number;
                totalJSHeapSize: number;
                usedJSHeapSize: string;
              };
            }
          ).memory.usedJSHeapSize;
        } catch (e) {
          metadata.memoryError = "Failed to collect memory data: " + e;
        }
      }

      return metadata;
    };

    // Send the error notification
    const sendAlert = async () => {
      const metadata = collectErrorMetadata();

      const formattedContent = `
## Error Details
- **Type:** ${metadata.errorName}
- **Message:** ${metadata.errorMessage}
- **Digest:** ${metadata.errorDigest}
- **URL:** ${metadata.url}
- **Timestamp:** ${metadata.timestamp}

## Stack Trace
\`\`\`
${metadata.errorStack || "No stack trace available"}
\`\`\`

## User Context
- **User Agent:** ${metadata.userAgent}
- **Platform:** ${metadata.platform}
- **Language:** ${metadata.language}
- **Screen:** ${metadata.screenSize} (${metadata.pixelRatio}x)
- **Viewport:** ${metadata.viewport}
- **Referrer:** ${metadata.referrer}

## Performance Data
- **Page Load Time:** ${metadata.pageLoadTime || "N/A"}
- **DOM Interactive:** ${metadata.domInteractive || "N/A"}
- **Connection Type:** ${metadata.connectionType || "N/A"}

## User App Data
- **User ID:** ${metadata.userId || "N/A"}
- **Email:** ${metadata.email || "N/A"}
      `;

      // markdown to html
      const content = await marked.parse(formattedContent);
      logger.log({ content });

      try {
        const mail = await mailNotifier.sendError({
          subject: `Client Error: ${error.name} in ${pathname}`,
          content: content,
          metadata: metadata,
          to: [SUPPORT_MAIL],
        });

        logger.log({ mail, errorInfo: "Error notification sent" });
      } catch (sendError) {
        logger.error("Failed to send error notification:", sendError);
        logger.error("Failed to send error notification", { sendError });
      }
    };

    // Log the error to logger for local debugging
    logger.error("Error occurred:", error);

    // Send the alert
    sendAlert();
  }, [user?.email, error, pathname, searchParams, user?.id]);

  return <ErrorPage error={error} resetError={reset} />;
}
