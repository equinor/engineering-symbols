import React, { ReactElement, SVGAttributes } from 'react';

export const ZoomOut = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1" viewBox="0 0 24 24">
		<path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m17 17 4 4M3 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0ZM8 11h6"></path>
	</svg>
);
