import styled from 'styled-components';

export const IconButton = styled.button`
	border: 1.5px solid ${({ theme }) => theme.backgroundGrey};
	background: ${({ theme }) => theme.body};
	box-shadow: ${({ theme }) => theme.boxShadow};
	appearance: none;
	border-radius: 12px;
	padding: 0.4rem;
	transition: background 0.2s ease;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:hover:not([disabled]) {
		background: ${({ theme }) => theme.hover.textBackground};

		svg {
			transform: scale(1.15);
		}
	}

	svg {
		display: block;
		width: 1.5rem;
		fill: none;
		stroke: ${({ theme }) => theme.fill};
		transition: transform 0.2s ease;
	}
`;
