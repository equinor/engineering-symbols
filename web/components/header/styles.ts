import styled from 'styled-components';

interface MenuStateProps {
	isOpen: boolean;
}

interface NavStyledListItemProps {
	isActive: boolean;
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
	align-items: flex-start;
	justify-content: flex-start;
	z-index: 1;
	position: relative;
`;

export const HeaderLogoStyled = styled.span`
	padding-right: 0.5rem;
	display: flex;
	align-items: center;
`;

export const NavStyled = styled.nav<MenuStateProps>`
	position: absolute;
	/* top: 0.9rem; */
	top: 4.2rem;
	left: 0;
	right: 0;
	/* margin: 3rem auto 0; */
	margin: 0 auto;
	width: 100%;
	z-index: 0;

	@media screen and (max-width: 1024px) {
		opacity: ${({ isOpen }) => `${isOpen ? 1 : 0}`};
		z-index: ${({ isOpen }) => `${isOpen ? 1 : -1}`};
		background: ${({ theme }) => theme.body};
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
`;

export const NavStyledListItem = styled.li<NavStyledListItemProps>`
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	position: relative;
	background: transparent;
	line-height: 1;
	margin-top: -0.9rem;

	/* @media screen and (max-width: 1024px) {
		margin: 0 0 2rem;
	} */

	&::before {
		content: '';
		/* padding: 0.9rem 0.2rem; */
		border-radius: 5px;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		background: ${({ theme }) => theme.hover.textBackground};
		transform: ${({ isActive }) => (isActive ? 'scale(1)' : 'scale(0.8)')};
		opacity: ${({ isActive }) => (isActive ? 1 : 0)};
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	@media screen and (max-width: 1024px) {
		margin: 0 0 2rem;
	}

	&:hover {
		&::before {
			opacity: 1;
			transform: scale(1);
		}
	}

	a {
		display: block;
		padding: 0.9rem 1.5rem;
		/* padding: 0 1.5rem; */
		font-size: 16px;
	}
`;

export const HeaderNoteStyled = styled.div`
	font-size: 14px;
	line-height: 2;
	padding: 0 3rem 0 0;

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

	${({ isOpen }) =>
		isOpen &&
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
