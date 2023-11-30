import React, { ReactElement, SVGAttributes } from 'react';

export const SideLeft = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} strokeWidth="1.8" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
		<path d="M3.66666 33V11C3.66666 7.96244 6.1291 5.5 9.16666 5.5H12.8333C15.8709 5.5 18.3333 7.96244 18.3333 11V33C18.3333 36.0377 15.8709 38.5 12.8333 38.5H9.16666C6.1291 38.5 3.66666 36.0377 3.66666 33Z" />
		<path
			d="M40.3333 5.5C40.3333 8.74519 40.3333 8.78333 40.3333 12.8334V31.1668C40.3333 35.2168 40.3333 35.0715 40.3333 38.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M18.3333 22H33M33 22L27.5 16.5M33 22L27.5 27.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
