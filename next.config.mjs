/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "assets.react-photo-album.com" },
      { hostname: "images.prismic.io" },
    ],
  },
};

export default nextConfig;
