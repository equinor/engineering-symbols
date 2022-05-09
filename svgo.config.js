module.exports = {
	multipass: false,
	plugins: [
		'removeTitle',
		'removeEmptyAttrs',
		'removeDesc',
		{
			name: 'prefixIds',
			params: {
				delim: '_',
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
