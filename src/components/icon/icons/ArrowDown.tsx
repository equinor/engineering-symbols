import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 96 96" fill="none" {...props}>
		<path d="M4 80H92" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
		<path d="M17.7342 78.9753V60.0199" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
		<path d="M74.2658 78.9753V60.0199" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
		<path d="M36.6836 78.9753V60.0199" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
		<path d="M56.1514 78.9753V60.0199" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
		<path d="M83.2586 56.9659H9.92525V42.7493H83.2586V56.9659Z" strokeMiterlimit={10} strokeLinecap="round" />
		<path d="M77.6273 42.6281H53.674V18.5639H77.6273V42.6281Z" strokeMiterlimit={10} strokeLinecap="round" />
		<path d="M13.3223 41.5847L22.0043 12H32.7409L39.7941 41.9549" strokeMiterlimit={10} strokeLinecap="square" strokeLinejoin="round" />
	</svg>
);

export default SvgArrowDown;
