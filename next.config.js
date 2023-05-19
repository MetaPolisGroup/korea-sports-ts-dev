/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "media-3.api-sports.io",
      "media.api-sports.io",
      "gg-7878.com",
      "storage.googleapis.com",
    ],
  },
};
