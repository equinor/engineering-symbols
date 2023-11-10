import React, { ReactElement, SVGAttributes } from 'react';

export const List = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 5H11" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M3 12H16" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M3 19H21" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
	</svg>
);
