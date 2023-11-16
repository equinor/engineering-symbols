import React, { ReactElement, SVGAttributes } from 'react';

export const RotateTR = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} viewBox="0 0 24 24" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
		<path d="M20 10V7C20 4.79086 18.2091 3 16 3H12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M22.5 7.5L20 10L17.5 7.5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M14 17L14 11C14 10.4477 13.5523 10 13 10L7 10" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M2 10H4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M14 22V20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
		<path d="M4 8L4 19C4 19.5523 4.44772 20 5 20L16 20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
	</svg>
);
