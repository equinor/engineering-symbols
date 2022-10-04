import styled from 'styled-components';

interface MenuStateProps {
	isOpen: boolean;
}

export const HeaderStyled = styled.header`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 3rem 0;
`;

export const LogoWrapStyled = styled.div`
	display: flex;
	align-items: center;
	z-index: 1;
	position: relative;
`;

export const HeaderLogoStyled = styled.a`
	padding-right: 1rem;
`;

export const NavStyled = styled.nav<MenuStateProps>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	margin: 3rem auto 0;
	width: 100%;
	z-index: 0;

	@media screen and (max-width: 1024px) {
		opacity: ${(props) => `${props.isOpen ? 1 : 0}`};
		z-index: ${(props) => `${props.isOpen ? 1 : -1}`};
		background: white;
		margin: 0;
		padding: 16rem 2rem;
		width: 100%;
		transition: all 0.3s ease;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		margin: 0;

		@media screen and (max-width: 1024px) {
			flex-direction: column;
		}
	}

	li {
		padding: 1rem 1.5rem;
		color: black;
		background-color: white;
		transition: background-color 0.4s ease, color 0.4s ease;
		cursor: pointer;

		@media screen and (max-width: 1024px) {
			margin: 0 0 2rem;
		}

		&:hover {
			background-color: black;
			color: white;
		}
	}
`;

export const HeaderNoteStyled = styled.div`
	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

export const BurgerWrapStyled = styled.div<MenuStateProps>`
	cursor: pointer;
	z-index: 10;

	@media screen and (min-width: 1025px) {
		display: none;
	}

	svg {
		height: 80px;
		width: 80px;

		@media screen and (max-width: 1014px) {
			svg {
				height: 40px;
				width: 40px;
			}
		}
	}

	path {
		fill: none;
		stroke: black;
		stroke-width: 6px;
		stroke-linecap: round;
		stroke-linejoin: round;
		transform-origin: 50%;
		transition: stroke-dasharray 500ms 200ms, stroke-dashoffset 500ms 200ms, transform 500ms 200ms;
	}

	${(props) =>
		props.isOpen &&
		`
    .line {
      transition: transform 400ms;
    }
    .line1 {
      transform: translateX(18px) translateY(-3px) rotate(-45deg) scale(.7);
    }
    .line2 {
      transform: translateX(-18px) translateY(-3px) rotate(45deg) scale(.7);
    }
    .line3 {
      transform: translateY(0px) rotate(45deg) scale(.7);
    }
    .line4 {
      transform: translateY(0px) rotate(-45deg) scale(.7);
    }
    .line5 {
      transform: translateX(18px) translateY(3px) rotate(45deg) scale(.7);
    }
    .line6 {
      transform: translateX(-18px) translateY(3px) rotate(-45deg) scale(.7);
    }
  `};
`;
