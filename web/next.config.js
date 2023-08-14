/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
	compiler: {
		styledComponents: true,
	},
	publicRuntimeConfig: {
		NEXT_PUBLIC_MSAL_CLIENT_ID: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID,
		NEXT_PUBLIC_MSAL_AUTHORITY: process.env.NEXT_PUBLIC_MSAL_AUTHORITY,
		NEXT_PUBLIC_API_SCOPE: process.env.NEXT_PUBLIC_API_SCOPE,
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
