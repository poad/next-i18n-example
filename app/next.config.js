/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer');
// const { i18n } = require('./next-i18next.config');

const config = {
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: false,
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
