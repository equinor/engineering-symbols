module.exports = {
	staticDirs: ['../storybook-public'],
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-theme-playground'],
	core: { builder: 'webpack5' },
};
