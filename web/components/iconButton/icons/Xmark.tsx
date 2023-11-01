import React, { ReactElement, SVGAttributes } from 'react';

export const Xmark = (props: SVGAttributes<SVGElement>): ReactElement => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1" viewBox="0 0 24 24">
		<path
			d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"></path>
	</svg>
);
