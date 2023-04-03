import styled from 'styled-components';

interface ParallaxItemProps {
	top: number;
	left: number;
}

interface ButtonProps {
	appearance?: 'secondary';
}

export const DarkModeSwitcherStyled = styled.div`
	margin: 1rem auto 0 0;
	position: absolute;
	right: 3.5rem;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;

	label {
		width: 50px;
		height: 20px;
		position: relative;
		display: block;
		background: #ebebeb;
		border-radius: 20px;
		// box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 15px rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: 0.3s;
		&:after {
			content: '';
			width: 18px;
			height: 18px;
			position: absolute;
			top: 1px;
			left: 1px;
			background: linear-gradient(180deg, #ffcc89, #d8860b);
			border-radius: 18px;
			box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
			transition: 0.3s;
		}
		svg {
			position: absolute;
			width: 12px;
			top: 4px;
			z-index: 100;
			&.sun_svg__sun {
				left: 4px;
				fill: #fff;
				transition: 0.3s;
			}
			&.moon_svg__moon {
				left: 34px;
				fill: #7e7e7e;
				transition: 0.3s;
			}
		}
	}

	input {
		width: 0;
		height: 0;
		visibility: hidden;
		&:checked + label {
			background: #242424;
			&:after {
				left: 49px;
				transform: translateX(-100%);
				background: linear-gradient(180deg, #777, #3a3a3a);
			}
			svg {
				&.sun_svg__sun {
					fill: #7e7e7e;
				}
				&.moon_svg__moon {
					fill: #fff;
				}
			}
		}
		&:active:after {
			width: 26px;
		}
	}
`;

/* Footer */
export const FooterStyled = styled.footer`
	padding: 3rem 0;
	background: ${({ theme }) => theme.backgroundGrey};
`;

export const FooterWrapperStyled = styled.div`
	padding: 0 3rem;
`;

export const FooterMenuWrapperStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	border-bottom: 0.05rem solid ${({ theme }) => theme.textGrey};
`;

export const FooterMenuStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 4rem 2rem;
`;

export const FooterMenuTitleStyled = styled.h6`
	font-family: 'Equinor';
	font-size: 16px;
	color: ${({ theme }) => theme.text};
`;

export const FooterMenuListStyled = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	li {
		padding: 0 0 0.7rem;
		color: ${({ theme }) => theme.textBlackGrey};
		font-size: 15px;
	}

	a {
		font-family: 'Equinor';
	}
`;

export const FooterLicenseStyled = styled.div`
	font-size: 12px;
	color: ${({ theme }) => theme.text};
	padding: 1.5rem 0 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	p,
	a {
		font-family: 'Equinor';
	}

	a {
		text-decoration: underline;
	}
`;

/* Page */
export const ContainerStyled = styled.div`
	padding: 0 3.5rem;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
`;

export const HeroStyled = styled.div`
	min-height: calc(100vh - 13rem);

	h1 {
		font-size: 80px;
		padding: 8rem 0 5rem;
		text-align: center;

		@media screen and (max-width: 1023px) {
			font-size: 60px;
			padding: 2rem 0;
		}

		span {
			color: ${({ theme }) => theme.textGrey} !important;
		}
	}
`;

export const HeroDescriptionStyled = styled.p`
	color: ${({ theme }) => theme.textGrey};
	text-align: center;
	padding: 0 16rem;
	line-height: 1.8;
	font-size: 17px;
	font-family: 'Equinor';

	@media screen and (max-width: 1023px) {
		padding: 0 5rem;
	}
`;

export const ParallaxContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
`;

export const ParallaxItem = styled.div<ParallaxItemProps>`
	position: absolute;
	/* top: ${({ top }) => `${top}px`}; */
	/* left: ${({ left }) => `${left}px`}; */

	&:nth-child(1) {
		top: 20%;
		left: 20%;
	}

	&:nth-child(2) {
		top: 31%;
		left: 79%;
	}

	&:nth-child(3) {
		top: 15%;
		left: 35%;
	}

	&:nth-child(4) {
		top: 21%;
		left: 55%;
	}

	&:nth-child(5) {
		top: 14%;
		left: 70%;
	}

	&:nth-child(6) {
		top: 55%;
		left: 10%;
	}

	&:nth-child(7) {
		top: 72%;
		left: 23%;
	}

	&:nth-child(8) {
		top: 79%;
		left: 69%;
	}

	&:nth-child(9) {
		top: 62%;
		left: 87%;
	}
`;

export const HeroButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 7rem;
`;

export const ButtonStyled = styled.button<ButtonProps>`
	width: 10rem;
	margin: 0.5rem;
	font-family: 'Equinor';
	appearance: none;
	border: none;
	font-size: 15px;
	padding: 0.9rem 0.2rem;
	border-radius: 0.5rem;
	background: ${({ theme, appearance }) => (appearance ? theme.background : theme.backgroundGrey)};
	color: ${({ theme, appearance }) => (appearance ? theme.textWhite : theme.text)};
	cursor: pointer;
	transition: transform 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

// Section 2
export const SecondSectionStyled = styled.section`
	padding: 7.5rem 0;
	background: ${({ theme }) => theme.backgroundGrey};
`;

export const WrapperStyled = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	/* flex-wrap: nowrap; */
`;

export const HalfContainerStyled = styled.div`
	width: 50%;
`;

export const GetStartContentStyled = styled.div`
	padding: 0 5rem;

	h3 {
		font-family: 'Equinor';
		font-size: 44px;
		color: ${({ theme }) => theme.text};
	}

	p {
		font-family: 'Equinor';
		font-size: 15px;
		line-height: 1.5;
	}
`;

export const GetStartIllustrationStyled = styled.div`
	padding: 0 5rem;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	width: 280px;
	height: 260px;

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 100px;
	}
`;

export const GetStartButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-top: 2rem;
	margin-left: -0.5rem;
`;

// Section 3

export const ThirdSectionStyled = styled.div`
	padding: 7.5rem 0;
	/* background: ${({ theme }) => theme.background}; */
`;

export const CaseStudiesStyled = styled.div`
	h4 {
		text-align: center;
		font-size: 44px;
		font-family: 'Equinor';
	}

	p {
		font-family: 'Equinor';
		line-height: 1.5;
		text-align: center;
		max-width: 80%;
		margin: 2rem auto;
	}
`;

export const CaseStudyStyled = styled.div`
	width: calc(100% / 3);
`;

export const CaseStudyWrapperStyled = styled.div`
	width: 20rem;
	margin: auto;
`;

export const CaseStudyImageStyled = styled.div`
	position: relative;
	/* width: 20rem; */
	margin: 0 2rem;
	height: 20rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;

	img {
		position: absolute;
		top: 0;
		left: 0;
	}
`;

export const CaseStudyTextStyled = styled.div`
	h6 {
		font-size: 20px;
		padding: 0 0 0.3rem;
		font-family: 'Equinor';
	}

	p {
		padding: 0;
		margin: 0;
		text-align: left;
		font-family: 'Equinor';
	}
`;

// Section 4
export const TrustedImagesStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 3rem 0 0;
`;

export const TrustedImageStyled = styled.div`
	width: 100%;
	max-width: 10rem;
	height: 5rem;
	position: relative;
	margin: 0 1rem;

	a {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
	}

	img {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		height: auto !important;
	}
`;

export const FourthSectionStyled = styled.div`
	padding: 7.5rem 0;
	width: 100%;
	background: ${({ theme }) => theme.backgroundGrey};
`;

export const TrustedByStyled = styled.div`
	width: 100%;

	h5 {
		font-size: 40px;
		text-align: center;
	}
`;

// Section 5
export const FivethSectionStyled = styled.div`
	padding: 7.5rem 0;
`;

export const AvailableForStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 3rem 0 0;
`;

export const AvailableFormageStyled = styled.div`
	width: 100%;
	max-width: 3rem;
	height: 3rem;
	position: relative;
	margin: 0 2rem;

	a {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
	}

	img {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		height: auto !important;
	}
`;

// Other
export const InfoBoxesStyled = styled.ul`
	list-style: none;
	margin: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: top;
	padding: 6rem 0 0;

	@media screen and (max-width: 1023px) {
		flex-direction: column;
	}

	li {
		width: calc(100% / 4);
		padding: 0 1rem;

		@media screen and (max-width: 1023px) {
			width: 100%;
		}
	}

	h4,
	p {
		text-align: center;
	}

	h4 {
		font-size: 40px;
		color: black;
	}

	p {
		padding: 0 2rem;
		line-height: 1.4;
		color: rgba(0, 0, 0, 0.6);
	}
`;

export const AvailableListStyled = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 4rem 9rem 0;

	@media screen and (max-width: 1023px) {
		flex-direction: column;
	}

	li {
		position: relative;
		height: 5rem;

		@media screen and (max-width: 1023px) {
			margin: 0 auto 3rem;
		}

		img {
			object-fit: contain;
		}
	}

	.availableListText {
		width: auto;
		display: flex;
		align-items: center;
	}

	.availableListReact,
	.availableListFigma,
	.availableListCode,
	.availableListAdobe {
		width: 3rem;

		@media screen and (max-width: 1023px) {
			width: 5rem;
		}
	}

	.availableListFlutter {
		width: 5rem;
	}
`;
