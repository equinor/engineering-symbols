import styled from 'styled-components';

export const PanelContainerStyled = styled.div``;

export const PanelPresentationStyled = styled.div`
	/* min-height: 50vh; */
	height: 500px;
	/* height: 100%; */
	width: 100%;
	position: relative;
`;

export const PanelPresentationContentStyled = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	svg {
		width: 250px;
		height: auto;
		fill: ${({ theme }) => theme.fill};
	}

	#Annotations > * {
		fill: ${({ theme }) => theme.textRed};
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
