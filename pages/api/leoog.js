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

  const imageData = await fetch(new URL("./bg.jpg", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

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
          fontSize: "100px",
          textTransform: "capitalize",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(data:image/jpeg;base64,${Buffer.from(
            imageData
          ).toString("base64")})`,
        }}
      >
        <p
          style={{
            transform: "rotate(-5deg)",
          }}
        >
          {title}
        </p>
      </div>
    ),
    {
      headers: {
        "Cache-Control": "s-maxage=0",
      },
      width: 1000,
      height: 1000,
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
