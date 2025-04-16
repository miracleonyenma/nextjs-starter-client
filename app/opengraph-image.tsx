import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Starter";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "example.com";

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            height: "100%",
            padding: "80px",
            background: "linear-gradient(135deg, #EBF4FF, #FFFFFF)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "40px",
            }}
          >
            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="140"
              height="140"
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

            {/* Text Content */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* App name */}
              <span
                style={{
                  fontSize: "72px",
                  fontWeight: "800",
                  color: "#1D4ED8",
                  letterSpacing: "-0.03em",
                  lineHeight: "1",
                }}
              >
                {APP_NAME}
              </span>

              {/* Separator line */}
              <div
                style={{
                  width: "120px",
                  height: "4px",
                  background: "linear-gradient(to right, #1D4ED8, #60A5FA)",
                  borderRadius: "4px",
                }}
              />

              {/* Tagline */}
              <span
                style={{
                  fontSize: "36px",
                  color: "#374151",
                  fontWeight: "500",
                  lineHeight: "1.4",
                  maxWidth: "600px",
                }}
              >
                Modern foundation for your Next.js projects
              </span>

              {/* Features */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "40px",
                  marginTop: "20px",
                }}
              >
                {/* Performance */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>

                {/* Responsive */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
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

                {/* Modern */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
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
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "80px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
              {APP_URL}
            </span>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (e) {
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
