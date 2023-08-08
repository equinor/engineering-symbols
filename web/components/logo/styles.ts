import styled from 'styled-components';

interface LogoStyledProps {
	stroke: string;
	fill: string;
}

export const LogoStyled = styled.div<LogoStyledProps>`
	position: relative;
	display: flex;
	align-items: center;
	margin-right: 5px;
	width: 45px;

	path {
		stroke-dasharray: 150;
		stroke-dashoffset: 150;
		animation: dash 5s linear alternate infinite;
		/* stroke: black; */
		stroke: ${({ theme, stroke }) => theme[stroke]};
		stroke-width: 0.8px;
		/* fill: white; */
		fill: ${({ theme, fill }) => theme[fill]};
	}

	@keyframes dash {
		from {
			stroke-dashoffset: 150;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
`;
