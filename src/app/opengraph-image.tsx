import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "West African Health Partners — Infrastructure for independent medicine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/wahp-lockup-reversed.svg"));
  const mark = await readFile(join(process.cwd(), "public/brand/wahp-mark.svg"), "utf8");
  const watermark = mark.replace("#036", "#26507a");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#003366",
          position: "relative",
          padding: 72,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <img
          alt=""
          width={620}
          height={620}
          src={`data:image/svg+xml;base64,${Buffer.from(watermark).toString("base64")}`}
          style={{ position: "absolute", right: -120, top: 5 }}
        />
        <img alt="" width={420} height={95} src={`data:image/svg+xml;base64,${logo.toString("base64")}`} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span style={{ color: "#BCBFCC" }}>Infrastructure for</span>
          <span style={{ color: "#FFFFFF" }}>independent medicine.</span>
        </div>
        <div style={{ display: "flex", color: "#BCBFCC", fontSize: 26 }}>Pre-launch · Accra, Ghana</div>
      </div>
    ),
    size,
  );
}
