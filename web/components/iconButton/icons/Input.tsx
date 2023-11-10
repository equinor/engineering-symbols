import React, { ReactElement, SVGAttributes } from 'react';

export const Input = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6Z"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"></path>
		<path
			d="M5 8.5H6.5M8 8.5H6.5M6.5 8.5V15.5M6.5 15.5H5M6.5 15.5H8"
			stroke="#000000"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"></path>
	</svg>
);
