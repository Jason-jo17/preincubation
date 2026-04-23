import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/innovationshowcase", destination: "/showcase", permanent: true },
      { source: "/msme-intel", destination: "/intel", permanent: true },
      { source: "/msins-platform", destination: "/msins", permanent: true },
      { source: "/mosi-interview", destination: "/mosi", permanent: true },
      { source: "/stakeholder-platform", destination: "/stakeholders", permanent: true },
      { source: "/strategy-map", destination: "/stakeholders/strategy-map", permanent: true },
      { source: "/problems", destination: "/stakeholders/problems", permanent: true },
      { source: "/solutions", destination: "/stakeholders/solutions", permanent: true },
      { source: "/sectors", destination: "/intel/sectors", permanent: true },
      { source: "/companies", destination: "/intel/companies", permanent: true },
      { source: "/institutions", destination: "/stakeholders/institutions", permanent: true },
      { source: "/analytics", destination: "/stakeholders/analytics", permanent: true },
      { source: "/pipeline", destination: "/msins/pipeline", permanent: true },
      { source: "/performance", destination: "/msins/performance", permanent: true },
      { source: "/leaderboard", destination: "/showcase/leaderboard", permanent: true },
      { source: "/review", destination: "/mosi/review", permanent: true },
      { source: "/schedule", destination: "/mosi/schedule", permanent: true },
    ];
  },
};

export default nextConfig;
