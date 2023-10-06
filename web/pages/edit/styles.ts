import styled from 'styled-components';

const HEIGHT = 445;

export const PanelContainerStyled = styled.div``;

export const PanelPresentationStyled = styled.div`
	/* min-height: 50vh; */
	height: ${HEIGHT}px;
	/* height: 100%; */
	width: 100%;
	position: relative;
`;

export const PanelPresentationContentStyled = styled.div`
	position: relative;
	top: 0;
	left: 0;
	/* width: 1000px; */
	height: ${HEIGHT}px;

	/* background: green; */

	canvas {
		display: block;
		width: 100%;
		/* height: 100%; */
		height: ${HEIGHT}px !important;
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

export const PanelSymbolsSearchWrapperStyled = styled.div`
	margin-bottom: 2rem;

	/* Fix EDS styling */
	& > div > div {
		background: transparent;
		box-shadow: none;
	}

	input {
		border: 1px solid ${({ theme }) => theme.backgroundGrey};
		border-radius: 12px;
		appearance: none;
	}
`;

export const PanelSymbolsStyled = styled.div`
	padding: 80px 0 0;
	border-top: 2px solid ${({ theme }) => theme.backgroundGrey};
`;

export const PanelSymbolsListStyled = styled.ul`
	list-style: none;
	display: grid;
	padding-left: 0;
	margin: 0;
	grid-template-rows: repeat(fit-content(150px));
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 1rem;

	li {
		transition: transform 0.3s ease;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}
	}
`;

export const UploadSvgStyled = styled.div`
	height: 170px;
	width: 100%;
	background: ${({ theme }) => theme.body};
	border: 1px solid #f2f2f2;
	border-radius: 12px;
	padding: 1rem;
	overflow: hidden;
	position: relative;

	input {
		display: none;
		visibility: hidden;
	}

	label {
		word-wrap: break-word;
		width: 100%;
		display: block;
		/* height: 40px; */
		text-align: center;
		/* padding: 0.2rem 0 0; */
		font-size: 18px;
		color: ${({ theme }) => theme.textBlackGrey};
		font-family: 'Equinor';
		padding-top: 90px;
		cursor: pointer;

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 33%;
			left: 50%;
			transform: translateX(-50%);
			width: 35%;
			height: 3px;
			background: ${({ theme }) => theme.backgroundGrey};
		}

		&:after {
			transform: rotate(90deg);
			left: calc(50% - 29px);
		}

		&:before {
		}
	}
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
