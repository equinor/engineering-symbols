import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11 5.03893L3.95523 12.0837L2.54101 10.6695L10.5858 2.62469C11.3669 1.84364 12.6332 1.84363 13.4142 2.62468L21.4591 10.6695L20.0449 12.0837L13 5.03887L13 22L11 22L11 5.03893Z"
		/>
	</svg>
);

export default SvgArrowUp;
