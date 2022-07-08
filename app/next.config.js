/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer');
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

const config = analyzer({
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      };
    }
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
  webpack5: true,
  reactStrictMode: true,
  swcMinify: false,
});

module.exports = config;