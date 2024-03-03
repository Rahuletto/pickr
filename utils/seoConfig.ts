import type { ManifestOptions } from "vite-plugin-pwa";

export const seoConfig = {
  baseURL: "https://pickr.pages.dev",
  description: "Saw a color and loved it? Just Pick it and get its hex code!",
  type: "website",
  siteName: "Pickr",
};

export const manifest: Partial<ManifestOptions> = {
  name: "Pickr",
  short_name: "Pickr",
  description: "Saw a color and loved it? Just Pick it and get its hex code!",
  theme_color: "#070707",
  background_color: "#070707",
  display: "minimal-ui",
  icons: [
    {
      src: "/public/favicon.svg",
      sizes: "192x192",
      type: "image/svg",
    },
  ],
};
