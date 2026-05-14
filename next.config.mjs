/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.49.240.174:8080/api/:path*",
      },
    ];
  },
  reactStrictMode: false,

};

export default nextConfig;
