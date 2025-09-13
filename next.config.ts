import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",            // cuando alguien entre a la raíz
        destination: "/dashboard", // lo mandás a /dashboard
        permanent: false,       // usá true si nunca va a cambiar
      },
    ];
  },
};

export default nextConfig;
