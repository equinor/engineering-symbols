import styled from 'styled-components';

interface ParallaxItemProps {
	top: number;
	left: number;
}

export const ButtonStyled = styled.button`
	appearance: none;
	border: none;
	font-size: 15px;
	padding: 0.9rem 0.2rem;
	border-radius: 0.5rem;
	background: ${({ theme }) => theme.backgroundGrey};
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;
