import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Santosh Sai Gowtham Pasala | AI Software Engineer",
    short_name: "Santosh Pasala",
    description:
      "AI Software Engineer with 4+ years of experience building scalable web applications and AI-powered systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
