const withBundleAnalyzer = require('@next/bundle-analyzer');
// const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    //   swcPlugins: [['typewind/swc', {}]],
    esmExternals: true,
  },
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
