import styled from 'styled-components';

export const ZoomButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 2rem;
	right: 520px;
`;

export const ZoomButton = styled.button`
	border: 1.5px solid ${({ theme }) => theme.backgroundGrey};
	background: ${({ theme }) => theme.body};
	box-shadow: ${({ theme }) => theme.boxShadow};
	appearance: none;
	border-radius: 12px;
	padding: 0.4rem;
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
