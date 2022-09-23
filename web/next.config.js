/** @type {import('next').NextConfig} */
const engineeringSymbols = require('next-transpile-modules')(['@equinor/engineering-symbols']);

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
};

module.exports = nextConfig;
