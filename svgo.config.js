module.exports = {
	multipass: false,
	plugins: [
		'removeTitle',
		'removeEmptyAttrs',
		'removeDesc',
		{
			name: 'prefixIds',
			params: {
				delim: '_we_',
			},
		},
		{
			name: 'removeAttrs',
			params: {
				attrs: '(stroke)',
			},
		},
	],
};
