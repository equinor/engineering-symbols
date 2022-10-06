/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	compiler: {
		styledComponents: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		providerImportSource: '@mdx-js/react',
	},
});

module.exports = withMDX(nextConfig);
