import styled from 'styled-components';

interface AnnotationWrapProps {
	presentConnectors: boolean;
	top: number;
	left: number;
}

interface PreviewStyledProps {
	isFixed: boolean;
	right: number;
	width: number;
}

interface CustomizeColorProps {
	color: string;
	show: boolean;
}

export const PreviewStyled = styled.div<PreviewStyledProps>`
	width: ${({ width }) => (width > 0 ? `${width}px` : 'auto')};
	max-width: 304px;
	min-width: 270px;
	position: ${({ isFixed }) => (isFixed ? 'fixed' : 'relative')};
	right: ${({ right }) => `${right}rem`};
	top: ${({ isFixed }) => (isFixed ? '2rem' : '0')};
`;

export const CustomizeStyled = styled.div`
	padding: 0 1rem 2rem;
	border-radius: 12px;
	align-self: start;
	margin: 0 0 0 1rem;
	box-shadow: ${({ theme }) => theme.boxShadow};
	// transition: all 0.3s ease;

	border: 1px solid #f2f2f2;
	// box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
	// box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	// box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
	// box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

export const IconsSearchStyled = styled.div`
	margin: 0 0 1rem 1rem;
	padding: 1rem;
	border-radius: 12px;
	border: 1px solid #f2f2f2;
	margin-bottom: 1rem;

	span {
		background: ${({ theme }) => theme.body};
		// border-bottom: 1px solid ${({ theme }) => theme.hover.body};
		// border: none;
	}

	input::placeholder {
		color: ${({ theme }) => theme.text} !important;
	}

	svg {
		fill: ${({ theme }) => theme.text};
	}
`;

export const PreviewWrapStyled = styled.div`
	// background: ${({ theme }) => theme.body} !important;
	// color: ${({ theme }) => theme.text} !important;
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const PreviewImageWrapStyled = styled.div`
	// margin: 0 1rem 0 0;
	display: flex;
	align-items: center;
	justify-content: center;

	#Annotations > * {
		fill: none;
	}
`;

export const AnnotationStyled = styled.div``;

export const PopoverWrapStyled = styled.div`
	display: flex;
	flex-direction: column;

	button + button {
		margin-top: 1rem;
	}
`;

export const AnnotationTooltipDotStyled = styled.div`
	position: relative;
	left: -1px;
	bottom: -5px;
	width: 0.15rem;
	height: 0.15rem;
	background: red;
	border-radius: 50%;
	z-index: 8;

	&:after {
		content: '';
		bottom: -7px;
		left: calc(50% - 0.5rem);
		transform: scale(0) translateX(-50%);
		position: absolute;
		background: red;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		animation: pulse 1.8s infinite;
		opacity: 1;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.2);
		}
		70% {
			opacity: 0.5;
		}
		100% {
			transform: scale(0.9);
			opacity: 0;
		}
	}
`;

export const AnnotationWrapStyled = styled.div<AnnotationWrapProps>`
	position: absolute;
	visibility: ${({ presentConnectors }) => (presentConnectors ? 'visible' : 'hidden')};
	opacity: ${({ presentConnectors }) => (presentConnectors ? '1' : '0')};
	top: ${({ top }) => `${top}px`};
	left: ${({ left }) => `${left}px`};
	z-index: 10;
	transition: all 0.3s ease;

	&:hover {
		span {
			transform: scale(1.2);
			z-index: 11;
		}

		span:before {
			opacity: 0;
		}

		span:after {
			transform: scale(0.8);
			// content: none
		}
	}
`;

export const AnnotationTooltipStyled = styled.span`
	position: relative;
	left: -50%;
	background-color: rgba(0, 0, 0, 0.9);
	color: white;
	display: flex;
	padding: 4px 12px 5px;
	border-radius: 3px;
	line-height: 1;
	font-size: 14px;
	box-shadow: rgba(255, 255, 255, 0.05) 0 6px 24px 0, rgba(255, 255, 255, 0.08) 0 0 0 1px;
	transition: all 0.3s ease;

	&:before {
		content: '';
		transition: all 0.3s ease;
		position: absolute;
		display: flex;
		z-index: 1;
		bottom: -7px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		opacity: 1;
		border-style: solid;
		border-width: 7px 7px 0 7px;
		border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
	}
`;

export const PreviewContentStyled = styled.div`
	// width: 50%;
	// margin: 0 0 0 1rem;
	position: relative;
`;

export const PreviewContentTitleStyled = styled.div`
	padding: 0 0 2rem;

	h2 {
		text-align: center;
		font-size: 34px;
		word-wrap: break-word;
	}
`;

export const PreviewContentDescStyled = styled.div`
	p {
		padding: 0 0 1rem 0;
	}
`;

export const PreviewContenButtonsStyled = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 2rem 0 0;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;

	& > button {
		width: 100%;
	}
`;

export const PreviewImageStyled = styled.div`
	position: relative;
	padding: 2rem 0;

	img {
		width: 100%;
	}
`;

export const CustomizeElementStyled = styled.div`
	padding: 2rem 0 0;
`;

export const CustomizeResetStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const CustomizeColorStyled = styled.div<CustomizeColorProps>`
	position: relative;
	padding: 1.5rem 0 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	input {
		position: absolute;
		right: -1rem;
		top: -1rem;
		width: 5rem;
		height: 4rem;
		border: none;
	}

	.react-colorful {
		display: ${({ show }) => (show ? 'flex' : 'none')};
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
	}

	button {
		width: 4rem;
		background: ${({ color }) => `${color}`};

		&:hover {
			background: ${({ color }) => `${color}`};
		}
	}
`;
