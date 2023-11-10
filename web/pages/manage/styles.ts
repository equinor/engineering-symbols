import styled from 'styled-components';

interface PanelActionProps {
	isShow: boolean;
}

const HEIGHT = 82;
const MIN_HEIGHT = 550;

export const PanelContainerStyled = styled.div`
	overflow-x: visible;
	overflow-y: hidden;
`;

export const PanelPresentationStyled = styled.div`
	/* min-height: 50vh; */
	height: ${HEIGHT}vh;
	min-height: ${MIN_HEIGHT}px;
	/* height: 100%; */
	width: 100%;
	overflow: hidden;
	position: relative;
`;

export const LogoWrapperStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0.1;
	user-select: none;

	p {
		font-family: 'Equinor';
		font-size: 75px;
		padding: 0 0 0 0.3rem;
		font-weight: 600;
		white-space: nowrap;
		color: ${({ theme }) => theme.text};
	}

	svg {
		position: relative;
		display: flex;
		align-items: center;
		margin-right: 5px;
		width: 350px;

		path {
			stroke: ${({ theme }) => theme.background};
			stroke-width: 0.8px;
			fill: ${({ theme }) => theme.textWhite};
		}
	}
`;

export const PanelPresentationContentStyled = styled.div`
	position: relative;
	top: 0;
	left: 0;
	/* width: 1000px; */
	height: ${HEIGHT}vh;
	min-height: ${MIN_HEIGHT}px;

	/* background: green; */

	canvas {
		display: block;
		width: 100%;
		/* height: 100%; */
		height: ${HEIGHT}vh !important;
	}
`;

// export const PanelPresentationContentStyled = styled.div`
// 	position: absolute;
// 	top: 50%;
// 	left: 50%;
// 	transform: translate(-50%, -50%);

// 	svg {
// 		width: 250px;
// 		height: auto;
// 		fill: ${({ theme }) => theme.fill};
// 	}

// 	#Annotations > * {
// 		fill: ${({ theme }) => theme.textRed};
// 	}
// `;

export const PanelSymbolsStyled = styled.div`
	/* padding: 80px 0 0; */
	padding: 40px 0 0;
	border-top: 2px solid ${({ theme }) => theme.backgroundGrey};
`;

export const PanelFormActionsStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 0 0;
`;

export const PanelActionsStyled = styled.div<PanelActionProps>`
	position: absolute;
	top: 0;
	right: ${({ isShow }) => (isShow ? '22.7rem' : '1rem')};
	transition: 0.5s right ease;
	display: flex;
	flex-direction: column;

	button {
		margin-bottom: 0.35rem;
	}
`;

export const ListActionStyled = styled.div<PanelActionProps>`
	position: absolute;
	top: 0;
	left: ${({ isShow }) => (isShow ? '26.4rem' : '1rem')};
	transition: 0.5s left ease;
`;

export const PanelPresentationLinesWrapperStyled = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;

	div {
		position: absolute;
	}
`;

export const PanelPresentationMHLineStyled = styled.div`
	width: 100%;
	height: 100%;

	&::before,
	&::after {
		content: '';
		position: absolute;
	}

	&::before {
		width: 100%;
		height: ${HEIGHT * 0.5}px;
		top: 50%;
		transform: translateY(-50%);
		border-top: 1px solid ${({ theme }) => theme.backgroundGrey};
		border-bottom: 1px solid ${({ theme }) => theme.backgroundGrey};
	}

	&::after {
		height: 100%;
		width: ${HEIGHT * 0.5}px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 1px solid ${({ theme }) => theme.backgroundGrey};
		border-right: 1px solid ${({ theme }) => theme.backgroundGrey};
	}
`;

export const PanelPresentationMVLineStyled = styled.div`
	width: ${HEIGHT * 0.5}px;
	height: ${HEIGHT * 0.5}px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	&::before,
	&::after {
		content: '';
		position: absolute;
	}

	&::before {
		height: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-left: 1px solid ${({ theme }) => theme.backgroundGrey};
	}

	&::after {
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-top: 1px solid ${({ theme }) => theme.backgroundGrey};
	}
`;

export const PanelPresentationMRLineStyled = styled.div`
	width: ${HEIGHT * 0.71}px;
	height: ${HEIGHT * 0.71}px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(45deg);

	&::before,
	&::after {
		content: '';
		position: absolute;
	}

	&::before {
		height: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-left: 1px solid ${({ theme }) => theme.backgroundGrey};
	}

	&::after {
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-top: 1px solid ${({ theme }) => theme.backgroundGrey};
	}
`;

export const PanelPresentationMSLineStyled = styled.div`
	width: ${HEIGHT * 0.5}px;
	height: ${HEIGHT * 0.5}px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid ${({ theme }) => theme.backgroundGrey};
		border-radius: 50%;
	}

	&::before {
		height: 85%;
		width: 85%;
	}

	&::after {
		height: 30%;
		width: 30%;
	}
`;
