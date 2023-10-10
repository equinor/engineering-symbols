import styled from 'styled-components';

export const PanelDetailsInformationContainer = styled.p`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: -2rem;
	font-size: 13px;
	left: 50%;
	transform: translate(-50%);
	padding: 0.6rem 0.8rem 0.8rem;
	border-radius: 12px;
	border: 1.5px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	background: ${({ theme }) => theme.body};
`;

export const ZoomButton = styled.button`
	background: transparent;
	border: 1.5px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	appearance: none;
	border-radius: 12px;
	padding: 0.4rem;
	background: transparent;
	transition: background 0.2s ease;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.hover.textBackground};
	}

	& + button {
		margin-top: 0.5rem;
	}

	svg {
		display: block;
		width: 1.5rem;
		fill: none;
		stroke: ${({ theme }) => theme.fill};
		transition: transform 0.2s ease;

		&:hover {
			transform: scale(1.15);
		}
	}
`;
