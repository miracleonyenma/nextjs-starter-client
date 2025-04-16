// app/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Define dynamic segments
export const generateImageMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  return [
    {
      id: params.slug,
      size,
      contentType,
    },
  ];
};

// Image generation function
export default async function Image({ params }: { params: { slug: string } }) {
  try {
    // Format the slug to be more readable
    const title = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #DBEAFE, #EFF6FF)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* Left content area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "65%",
              height: "100%",
              paddingLeft: "80px",
              position: "relative",
              zIndex: "2",
            }}
          >
            {/* Logo and name container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
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
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  color: "#1D4ED8",
                  marginLeft: "14px",
                }}
              >
                Starter
              </span>
            </div>

            {/* Page context label */}
            <div
              style={{
                background: "#DBEAFE",
                color: "#1E40AF",
                fontSize: "18px",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "20px",
                display: "inline-block",
                marginBottom: "20px",
                width: "fit-content",
              }}
            >
              {params.slug.includes("blog") ? "Blog Post" : "Feature"}
            </div>

            {/* Dynamic title with emphasis */}
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "800",
                color: "#1E3A8A",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                margin: "0 0 24px 0",
                maxWidth: "90%",
              }}
            >
              {title}
            </h1>

            {/* Date and info line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              <span
                style={{
                  fontSize: "18px",
                  color: "#4B5563",
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Right visual area with decorative elements */}
          <div
            style={{
              position: "relative",
              width: "35%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Main decorative shape */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-100px",
                transform: "translateY(-50%)",
                width: "500px",
                height: "500px",
                borderRadius: "250px",
                background: "#BFDBFE",
                zIndex: "1",
              }}
            />

            {/* Second decorative shape */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-150px",
                transform: "translateY(-50%)",
                width: "400px",
                height: "400px",
                borderRadius: "250px",
                background: "#3B82F6",
                zIndex: "2",
              }}
            />

            {/* Inner accent shape */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-180px",
                transform: "translateY(-50%)",
                width: "300px",
                height: "300px",
                borderRadius: "150px",
                background: "#1D4ED8",
                zIndex: "3",
              }}
            />

            {/* Abstract line pattern */}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "200px",
                height: "200px",
                zIndex: "4",
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    bottom: `${i * 30}px`,
                    right: "0",
                    width: `${160 - i * 20}px`,
                    height: "3px",
                    background: "#93C5FD",
                    borderRadius: "2px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer with website URL */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "80px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              zIndex: "10",
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
              example.com/{params.slug}
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
    console.error(`Error generating dynamic OG image: ${e}`);
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
            width="80"
            height="80"
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
          </svg>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1D4ED8",
              marginTop: "20px",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            {params.slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
