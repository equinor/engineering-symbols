import styled from 'styled-components';

export const SignButtonWrapperStyled = styled.div`
	display: flex;
	align-items: center;
	top: -0.5rem;
	right: 0;
	position: absolute;
`;

export const SignButtonStyled = styled.button`
	background: transparent;
	display: flex;
	align-items: center;
	border: none;
	appearance: none;
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
		width: 1.6rem;
		fill: none;
		stroke: ${({ theme }) => theme.fill};
	}

	p {
		padding: 0;
		margin: 0;
	}
`;

export const SignButtonNoteStyled = styled.div`
	font-size: 14px;
	line-height: 2;
	padding: 0 0.5rem 0 0;

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;
