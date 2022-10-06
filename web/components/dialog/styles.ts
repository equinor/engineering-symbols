import styled from 'styled-components';

interface AnnotationWrapProps {
	presentConnectors: boolean;
	top: number;
	left: number;
}

interface DialogSvgImageProps {
	width: number;
	height: number;
}

export const DialogWrapStyled = styled.div`
	background: ${({ theme }) => theme.body} !important;
	// color: ${({ theme }) => theme.text} !important;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-direction: row;
	position: relative;
	align-items: stretch;
	width: 55rem;
`;

export const DialogImageWrapStyled = styled.div`
	margin: 0 1rem 0 0;
	width: 50%;
	min-height: 25rem;
	display: flex;
	align-items: center;
	justify-content: center;

	#Annotations > * {
		fill: none;
	}
`;

export const AnnotationStyled = styled.div``;

export const AnnotationTooltipDotStyled = styled.div`
	position: relative;
	left: -1px;
	bottom: -7px;
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
	visibility: ${(props) => (props.presentConnectors ? 'visible' : 'hidden')};
	opacity: ${(props) => (props.presentConnectors ? '1' : '0')};
	top: ${(props) => `${props.top}px`};
	left: ${(props) => `${props.left}px`};
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

export const DialogSvgImageStyled = styled.div<DialogSvgImageProps>`
	svg {
		width: ${(props) => `${props.width}px`};
		height: ${(props) => `${props.height}px`};
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

export const DialogContentStyled = styled.div`
	width: 50%;
	margin: 0 0 0 1rem;
	position: relative;
`;

export const DialogContentTitleStyled = styled.div`
	padding: 0 0 2rem;

	h2 {
		text-align: center;
		font-size: 34px;
	}
`;

export const DialogContentDescStyled = styled.div`
	p {
		padding: 0 0 1rem 0;
	}
`;

export const DialogContenButtonsStyled = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;

	& > button {
		width: 100%;
	}
`;

export const DialogImageStyled = styled.div`
	position: relative;

	img {
		width: 100%;
	}
`;

// export const DialogImageWrapStyled = styled.div``;
