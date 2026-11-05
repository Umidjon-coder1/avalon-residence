import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Kamroq o'lcham: srcset qisqaroq, HTML yengilroq. Dizayn 1920 px, retina uchun 2560/3840
  images: {
    deviceSizes: [640, 960, 1280, 1920, 2560],
    imageSizes: [128, 256, 400],
    // Faqat WebP: AVIF renderlarning mayda detallarini "yumshatib" yuborardi (muallif: rasmlar xira)
    formats: ["image/webp"],
    // Fotolar 90 sifatda (renderlar tiniq ko'rinsin), qolganlari standart 75
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
