import styled from 'styled-components';

interface AnnotationWrapProps {
	presentConnectors: boolean;
	top: number;
	left: number;
}

interface CustomizeColorProps {
	color: string;
	show: boolean;
}

interface PreviewStyledProps {
	isShow: boolean;
}

interface PreviewImageStyledProps {
	rotate: number;
}

interface CustomizeSliderProps {
	value: number;
	min: number;
	max: number;
}

export const PreviewStyled = styled.div<PreviewStyledProps>`
	max-width: 1440px;
	/* max-width: 90%; */
	width: calc(100% - 7rem);
	min-width: 27rem;
	height: 20rem;
	position: fixed;
	bottom: 2rem;
	border: 1px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	transform: ${({ isShow }) => (isShow ? 'translateY(0)' : 'translateY(10rem)')};
	opacity: ${({ isShow }) => (isShow ? '1' : '0')};
	transition: 0.5s transform ease, 0.2s opacity ease;
	left: 0;
	right: 0;
	margin: 0 auto 2rem;
	z-index: 10;
	background: ${({ theme }) => theme.body};
	border-radius: 12px;
`;

export const CustomizeStyled = styled.div`
	/* position sticky; */
	/* top: 1rem; */
	/* padding: 0 1rem 2rem; */
	display: flex;
	justify-content: space-between;
	align-self: start;
	height: 100%;
	/* margin: 0 0 0 1rem; */

	/* box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset; */
	/* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
	/* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
`;

export const PreviewCloseButtonStyled = styled.button`
	position: absolute;
	top: 1.5rem;
	right: 1.2rem;
	appearance: none;
	background: transparent;
	border: none;
	transition: transform 0.3s ease;
	cursor: pointer;

	&:hover {
		transform: scale(1.25);
	}

	svg {
		width: 1rem;
		height: 1rem;
		fill: ${({ theme }) => theme.text};
	}
`;

export const PreviewWrapStyled = styled.div`
	// background: ${({ theme }) => theme.body} !important;
	// color: ${({ theme }) => theme.text} !important;
	padding: 2rem;
	width: 25.5rem;
	display: flex;
	flex-direction: column;
	position: relative;

	button {
		margin: 2rem auto 0;
		padding: 0.6rem 1rem;
		height: auto;
		font-family: 'Equinor';
		appearance: none;
		border: none;
		font-size: 15px;
		border-radius: 0.5rem;
		background: ${({ theme }) => theme.backgroundGrey};
		color: ${({ theme }) => theme.text};
		cursor: pointer;
		transition: transform 0.3s ease;

		&:hover {
			background: ${({ theme }) => theme.backgroundGrey};
			border: none;
			transform: scale(1.05);
		}
	}
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
	transition: all 0.3s ease;

	span {
		z-index: 10;
	}

	&:hover {
		span {
			transform: scale(1.2);
			z-index: 11;

			&:before {
				opacity: 0;
			}

			&:after {
				transform: scale(0.8);
			}
		}
	}
`;

export const AnnotationTooltipStyled = styled.span`
	position: relative;
	left: -50%;
	background-color: rgba(0, 0, 0, 0.9);
	color: #fafafa !important;
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

export const PreviewContenButtonsStyled = styled.div`
	display: flex;
	flex-direction: row;
	/* justify-content: end; */
	/* align-items: flex-end; */
	/* flex-wrap: wrap; */
	padding: 2rem 0 0;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;

	& > button {
		width: 100%;
	}

	button {
		width: auto;
		min-width: 12rem;
		/* margin-top: 3rem; */
		padding: 0.6rem 1rem;
		height: auto;
		appearance: none;
		border: none;
		font-size: 15px;
		border-radius: 0.5rem;
		background: ${({ theme }) => theme.backgroundGrey};
		cursor: pointer;
		transition: transform 0.3s ease;

		span {
			font-style: normal !important;

			font-family: 'Equinor';
			color: ${({ theme }) => theme.text} !important;
		}

		&:hover {
			background: ${({ theme }) => theme.backgroundGrey};
			border: none;
			transform: scale(1.05);
		}
	}
`;

export const PreviewImageStyled = styled.div<PreviewImageStyledProps>`
	position: relative;
	padding: 2rem 0;

	svg {
		transform: ${({ rotate }) => `rotate(${rotate}deg)`};
	}

	img {
		width: 100%;
	}
`;

export const CustomizeElementsStyled = styled.div`
	/* background: ${({ theme }) => theme.backgroundGrey}; */
	border-left: 0.1rem solid ${({ theme }) => theme.backgroundGrey};
	display: flex;
	width: 100%;
	height: 100%;
	padding: 2rem;
	flex-direction: column;

	h2 {
		padding: 0 0 1rem;
	}
`;

export const CustomizeElementStyled = styled.div`
	padding: 1rem 0;
	/* width: 33%; */
	/* flex: 1 1 50%; */
`;

export const CustomizeDetailsStyled = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: center;
	align-items: center;
`;

export const CustomizeSliderStyled = styled.div<CustomizeSliderProps>`
	padding: 0 2rem 0 0;
	width: 40%;
	position: relative;

	input {
		width: 100%;
		-webkit-appearance: none;
		/* width:400px; */
		height: 0.1rem;
		border-radius: 0.5rem;
		outline: none;
		background: ${({ theme, value, min, max }) =>
			`linear-gradient(to right, ${theme.background} 0%, ${((value - min) / (max - min)) * 100}%, ${theme.backgroundGrey} 100%) !important`};
	}
	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: ${({ theme }) => theme.background};
		z-index: 10;
		position: relative;
		cursor: pointer;
	}

	output {
		position: absolute;
		font-family: 'Equinor';
		font-size: 12px;
		padding: 0.6rem 0 0 0.4rem;
		left: ${({ value }) => (100 / 455) * value + `%`};
		color: ${({ theme }) => theme.text};
	}
`;

export const CustomizeResetStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	button {
		padding: 0.6rem 1rem;
		height: auto;
		font-family: 'Equinor';
		appearance: none;
		border: none;
		font-size: 15px;
		border-radius: 0.2rem;
		background: ${({ theme }) => theme.backgroundGrey};
		color: ${({ theme }) => theme.text};
		cursor: pointer;
		transition: transform 0.3s ease;

		&:hover {
			background: ${({ theme }) => theme.backgroundGrey};
			border: none;
			transform: scale(1.05);
		}
	}
`;

export const CustomizeColorElementStyled = styled.div`
	width: 30%;
	min-width: 10rem;
	padding: 0 2rem 0 0;
`;

export const CustomizeResetElementStyled = styled.div`
	width: 30%;
	min-width: 10rem;
`;

export const CustomizeColorStyled = styled.div<CustomizeColorProps>`
	position: relative;
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
		width: 4.3rem;
		background: ${({ color }) => `${color}`};

		&:hover {
			background: ${({ color }) => `${color}`};
		}
	}
`;
