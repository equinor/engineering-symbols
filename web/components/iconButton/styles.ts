import styled from 'styled-components';

type IconButtonProps = {
	appearance?: string;
};

export const IconButton = styled.button<IconButtonProps>`
	border: 1.5px solid ${({ theme, appearance }) => (appearance ? theme[appearance] : theme.backgroundGrey)};
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

	&:not([disabled]) svg {
		stroke: ${({ theme, appearance }) => (appearance ? theme[appearance] : theme.fill)};
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
