/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ? public env
  env: {
    API_NOTE: process.env.API_NOTE,
  }
};

export default nextConfig;
