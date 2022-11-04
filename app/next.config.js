const withBundleAnalyzer = require('@next/bundle-analyzer');
// const { i18n } = require('./next-i18next.config');

const config = {
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: false,
};

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
