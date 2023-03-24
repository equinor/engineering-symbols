module.exports = {
	multipass: false,
	plugins: [
		'removeTitle',
		'removeEmptyAttrs',
		'mergePaths',
		'convertShapeToPath',
		'removeDesc',
		// {
		// 	name: 'prefixIds',
		// 	params: {
		// 		delim: '_',
		// 	},
		// },
		{
			name: 'removeAttrs',
			params: {
				attrs: ['(stroke)', '(fill)'],
			},
		},
	],
};
