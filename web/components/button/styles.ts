import styled from 'styled-components';

interface ButtonProps {
	appearance?: 'secondary';
	size?: 's';
}

export const ButtonStyled = styled.button<ButtonProps>`
	margin: 0.5rem;
	font-family: 'Equinor';
	appearance: none;
	border: none;
	font-size: 15px;

	padding: ${({ size }) => (size === 's' ? '0.6rem 1rem' : '0.9rem 0.2rem')};
	width: ${({ size }) => (size === 's' ? 'auto' : '10rem')};

	border-radius: 0.5rem;
	background: ${({ theme, appearance }) => (appearance ? theme.background : theme.backgroundGrey)};
	color: ${({ theme, appearance }) => (appearance ? theme.textWhite : theme.text)};
	cursor: pointer;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;
