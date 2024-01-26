/** @type {import('next').NextConfig} */
const nodeExternals = require('webpack-node-externals');

module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {fs : false}
    return config
  },
}
