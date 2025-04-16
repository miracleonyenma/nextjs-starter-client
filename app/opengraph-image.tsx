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
    // Load local Host Grotesk font
    const fontData = await fetch(
      new URL(
        "../assets/fonts/HostGrotesk-VariableFont_wght.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

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
            background: "linear-gradient(to bottom right, #FFFFFF, #F5F9FF)",
            fontFamily: '"Host Grotesk", sans-serif',
          }}
        >
          {/* Content container with subtle border */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              height: "90%",
              padding: "40px",
              borderRadius: "24px",
              background: "white",
              boxShadow: "0 8px 30px rgba(20, 71, 230, 0.08)",
            }}
          >
            {/* Logo and name container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              {/* StarterIcon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 138 138"
                style={{ marginRight: "24px" }}
              >
                <rect
                  width="123"
                  height="123"
                  x="8"
                  y="8"
                  fill="#1447E6"
                  rx="61.5"
                />
                <rect
                  width="87"
                  height="87"
                  x="26"
                  y="26"
                  fill="#2B7FFF"
                  rx="43.5"
                />
                <rect
                  width="61"
                  height="61"
                  x="39"
                  y="39"
                  fill="#fff"
                  rx="30.5"
                />
              </svg>

              {/* Site name with stylish treatment */}
              <span
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  color: "#1447E6",
                  letterSpacing: "-0.02em",
                }}
              >
                Starter
              </span>
            </div>

            {/* Separator line */}
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "#2B7FFF",
                borderRadius: "2px",
                margin: "16px 0 24px 0",
              }}
            />

            {/* Tagline */}
            <span
              style={{
                fontSize: "32px",
                color: "#4B5563",
                fontWeight: "400",
                fontStyle: "italic",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              Modern foundation for your Next.js projects
            </span>
          </div>

          {/* Footer text */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#6B7280",
                fontWeight: "400",
              }}
            >
              example.com
            </span>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Host Grotesk",
            data: fontData,
            style: "italic",
            weight: 400,
          },
        ],
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
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 138 138"
          >
            <rect
              width="123"
              height="123"
              x="8"
              y="8"
              fill="#1447E6"
              rx="61.5"
            />
            <rect
              width="87"
              height="87"
              x="26"
              y="26"
              fill="#2B7FFF"
              rx="43.5"
            />
            <rect width="61" height="61" x="39" y="39" fill="#fff" rx="30.5" />
          </svg>
          <span
            style={{ fontSize: "48px", fontWeight: "bold", marginTop: "24px" }}
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
