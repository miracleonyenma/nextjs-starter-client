// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation function
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #EBF4FF, #FFFFFF)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Content container with subtle border */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "92%",
              height: "92%",
              padding: "40px",
              borderRadius: "28px",
              background: "white",
              boxShadow: "0 8px 40px rgba(37, 99, 235, 0.12)",
              border: "1px solid rgba(37, 99, 235, 0.08)",
            }}
          >
            {/* Logo and name container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              {/* Logo - Updated with more modern design */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                viewBox="0 0 200 200"
                style={{ marginRight: "28px" }}
              >
                <rect
                  width="180"
                  height="180"
                  x="10"
                  y="10"
                  fill="#1D4ED8"
                  rx="40"
                />
                <rect
                  width="130"
                  height="130"
                  x="35"
                  y="35"
                  fill="#3B82F6"
                  rx="30"
                />
                <rect
                  width="80"
                  height="80"
                  x="60"
                  y="60"
                  fill="#FFFFFF"
                  rx="20"
                />
                <path
                  d="M100 85 L115 115 L90 100 L110 100 L85 115 Z"
                  fill="#1D4ED8"
                />
              </svg>

              {/* Site name with stylish treatment */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "72px",
                    fontWeight: "800",
                    color: "#1D4ED8",
                    letterSpacing: "-0.03em",
                    lineHeight: "1",
                  }}
                >
                  Starter
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#6B7280",
                    letterSpacing: "0.02em",
                    marginTop: "4px",
                  }}
                >
                  by Next.js
                </span>
              </div>
            </div>

            {/* Separator line with gradient */}
            <div
              style={{
                width: "120px",
                height: "4px",
                background: "linear-gradient(to right, #1D4ED8, #60A5FA)",
                borderRadius: "4px",
                margin: "28px 0 32px 0",
              }}
            />

            {/* Tagline */}
            <span
              style={{
                fontSize: "36px",
                color: "#374151",
                fontWeight: "500",
                textAlign: "center",
                maxWidth: "80%",
                lineHeight: "1.3",
              }}
            >
              Modern foundation for your Next.js projects
            </span>

            {/* Feature icons */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "40px",
              }}
            >
              {/* Performance icon */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#4B5563",
                    marginTop: "8px",
                  }}
                >
                  Performance
                </span>
              </div>

              {/* Responsive icon */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#4B5563",
                    marginTop: "8px",
                  }}
                >
                  Responsive
                </span>
              </div>

              {/* Modern icon */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#4B5563",
                    marginTop: "8px",
                  }}
                >
                  Modern
                </span>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span
              style={{
                fontSize: "16px",
                color: "#6B7280",
                fontWeight: "500",
              }}
            >
              example.com
            </span>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
    // Fallback in case of any error
    console.error(`Error generating OG image: ${e}`);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            background: "white",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 200 200"
          >
            <rect
              width="180"
              height="180"
              x="10"
              y="10"
              fill="#1D4ED8"
              rx="40"
            />
            <rect
              width="130"
              height="130"
              x="35"
              y="35"
              fill="#3B82F6"
              rx="30"
            />
            <rect width="80" height="80" x="60" y="60" fill="#FFFFFF" rx="20" />
            <path
              d="M100 85 L115 115 L90 100 L110 100 L85 115 Z"
              fill="#1D4ED8"
            />
          </svg>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginTop: "24px",
              color: "#1D4ED8",
            }}
          >
            Starter
          </span>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
