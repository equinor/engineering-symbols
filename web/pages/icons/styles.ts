import styled from 'styled-components';

interface IconWrapperProps {
	fill: string;
	rotate: number;
}

export const IconsHeaderStyled = styled.div`
	padding: 1rem 0 4rem;
	width: 100%;
`;

export const IconsSearchStyled = styled.div`
	span {
		background: ${({ theme }) => theme.body};
		border: 1px solid ${({ theme }) => theme.hover.body};
	}

	input::placeholder {
		color: ${({ theme }) => theme.text} !important;
	}

	svg {
		fill: ${({ theme }) => theme.text};
	}
`;

export const IconsContainerStyled = styled.div`
	padding: 2rem 0;
	display: flex;
`;

export const CategoriesStyled = styled.ul`
	width: 20%;
	padding: 0 3rem 0 0;
	list-style: none;
	margin: 0;

	button {
		width: 100%;

		& > span {
			display: flex;
			justify-content: space-between;
		}
	}

	li span {
		white-space: nowrap;
	}
`;

export const IconsListStyled = styled.ul`
	width: 60%;
	list-style: none;
	display: grid;
	padding-left: 0;
	margin: 0;
	grid-template-rows: 1fr 1fr 1fr;
	// grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 1rem;
	height: 100%;

	button {
		appearance: none;
		border: 0;
		margin: 0;
		padding: 0;
		border-radius: 0;
		background: none;
		height: 100%;
		width: 100%;
	}

	button > div {
		cursor: pointer;
		height: 100%;
		width: 100%;
		background: ${({ theme }) => theme.body};
		box-shadow: ${({ theme }) => theme.boxShadow};

		&:hover svg {
			transform: scale(1.1);
		}
	}

	svg {
		transition: transform 0.3s ease;
	}

	li p {
		text-align: center;
		word-wrap: break-word;
	}
`;

export const CustomizeStyled = styled.div`
	width: 20%;
	padding: 0 0 0 3rem;
`;

export const IconsListWrapStyled = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	height: 100%;

	#Annotations > * {
		fill: none;
	}
`;

export const CustomizeElementStyled = styled.div`
	padding: 2rem 0 0;
`;

export const CustomizeResetStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const CustomizeColorStyled = styled.div`
	position: relative;
	padding: 1.5rem 0 0;

	input {
		position: absolute;
		right: -1rem;
		top: -1rem;
		width: 5rem;
		height: 4rem;
		border: none;
	}

	.react-colorful {
		width: 100%;
	}
`;

export const CustomizeColorWrapStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0 0;

	p {
		padding: 0 0 0.75rem;
	}
`;

export const IconWrapperStyled = styled.div<IconWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 0 0 0.5rem;

	svg {
		fill: ${(props) => props.fill};
		transform: ${(props) => `rotate(${props.rotate}deg)`};
		transition: all 0.3s easy;
		width: 70px;
		height: 70px;
	}
`;
