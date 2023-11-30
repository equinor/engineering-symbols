import React, { ReactElement, SVGAttributes } from 'react';

export const SideRight = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} strokeWidth="1.8" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
		<path d="M40.3333 33V11C40.3333 7.96244 37.871 5.5 34.8333 5.5H31.1667C28.129 5.5 25.6667 7.96244 25.6667 11V33C25.6667 36.0377 28.129 38.5 31.1667 38.5H34.8333C37.871 38.5 40.3333 36.0377 40.3333 33Z" />
		<path
			d="M3.66664 5.5C3.66667 8.74377 3.66664 8.78324 3.66664 12.8333V31.1667C3.66664 35.2167 3.66666 35.3666 3.66663 38.3365"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M25.6667 22H11M11 22L16.5 16.5M11 22L16.5 27.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
