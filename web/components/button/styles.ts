import styled from 'styled-components';

interface ButtonProps {
	appearance?: 'secondary';
	hasError?: boolean;
	isWide?: boolean;
	size?: 's';
}

export const ButtonStyled = styled.button<ButtonProps>`
	margin: 0.5rem;
	font-family: 'Equinor';
	appearance: none;
	border: none;
	font-size: 15px;

	border: 1px solid ${({ hasError, theme }) => (hasError ? theme.textRed : 'transperent')};

	padding: ${({ size }) => (size === 's' ? '0.6rem 1rem' : '0.9rem 0.2rem')};
	width: ${({ size, isWide }) => (isWide ? '100%' : size === 's' ? 'auto' : '10rem')};

	border-radius: 0.5rem;
	background: ${({ theme, appearance }) => (appearance ? theme.background : theme.backgroundGrey)};
	color: ${({ theme, appearance, hasError }) => (hasError ? theme.textRed : appearance ? theme.textWhite : theme.text)};
	cursor: pointer;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;
