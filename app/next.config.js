const withBundleAnalyzer = require('@next/bundle-analyzer');
// const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const config = {
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
