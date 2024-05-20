/** @type {import('next').NextConfig} */
/*
const nextConfig = {};
export default nextConfig;
*/

const nextConfig = {
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Access-Control-Allow-Origin, Authorization, Origin, Content-Type, Access-Control-Allow-Headers, X-Requested-With",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

