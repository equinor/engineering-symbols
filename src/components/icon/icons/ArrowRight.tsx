import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 48 48" fill="none" {...props}>
		<rect id="ArrowRight_svg_we_hello" x={10} y={10} fill="red" width={5} height={5} />
		<rect id="ArrowRight_svg_we_hello2" x={20} y={20} fill="red" width={5} height={5} />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2 24C2 18.1652 4.31785 12.5695 8.44365 8.44365C12.5695 4.31785 18.1652 2 24 2C29.8348 2 35.4305 4.31785 39.5563 8.44365C43.6821 12.5695 46 18.1652 46 24C46 29.8348 43.6821 35.4305 39.5563 39.5563C35.4305 43.6821 29.8348 46 24 46C18.1652 46 12.5695 43.6821 8.44365 39.5563C4.31785 35.4305 2 29.8348 2 24H2Z"
			strokeMiterlimit={3}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M2 24.0001H46" strokeMiterlimit={3} strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

export default SvgArrowRight;
