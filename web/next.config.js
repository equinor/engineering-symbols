/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
