import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Leo Dass";

  const fontData = await fetch(
    new URL("../../fonts/Loutters.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Loutters"',
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundColor: "black",
          color: "yellow",
          fontWeight: "bold",
          fontSize: "60px",
          textTransform: "capitalize",
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Loutters",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
