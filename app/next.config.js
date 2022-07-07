/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer');
const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

const config = analyzer({
  i18n,
  webpack5: true,
  reactStrictMode: true,
  esmExternals: true,
  swcLoader: true,
  swcMinify: true,
}
);

module.exports = config;