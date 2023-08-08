import styled from 'styled-components';

interface SignButtonStyledProps {
	isActive: boolean;
}

export const SignButtonStyled = styled.button`
	position: absolute;
	background: transparent;
	border: none;
	appearance: none;
	top: -0.7rem;
	right: 0;
	border-radius: 5px;
	padding: 0.2rem;
	background: transparent;
	transition: background 0.2s ease;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.hover.textBackground};
	}

	svg {
		display: block;
		width: 2rem;
		fill: none;
		stroke: ${({ theme }) => theme.fill};
	}

	p {
		padding: 0;
		margin: 0;
	}
`;
