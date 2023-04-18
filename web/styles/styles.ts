import styled from 'styled-components';

interface ParallaxSvgWrapperProps {
	color: string;
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
	z-index: 10;

	.switch__background,
	.switch__background:before,
	.switch__background:after {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		cursor: pointer;
	}
	.switch {
		width: 33px;
		height: 15.4px;
		display: block;
		position: relative;
		margin: 0.55px auto;
	}
	.switch__background {
		border-radius: 7.7px;
		box-shadow: 0 3.85px 7.7px -1.71px rgba(32, 15, 55, 0.3);
		transition: box-shadow 0.8s;
		overflow: hidden;
	}
	.switch__background:before {
		content: '';
		background: linear-gradient(#200f37, #272065);
		border-radius: 7.7px;
		transition: opacity 0.8s;
		overflow: hidden;
		z-index: -2;
	}
	.switch__background:after {
		content: '';
		opacity: 0;
		background: linear-gradient(to right, #21d2f2, #b0fff8);
		border-radius: 7.7px;
		transition: opacity 0.8s;
		z-index: -2;
	}
	.switch__toggle {
		content: '';
		height: 13.54px;
		width: 13.24px;
		position: relative;
		display: block;
		top: 0.88px;
		left: 0.88px;
		background: #fff;
		border-radius: 100%;
		box-shadow: inset 0.88px -0.88px 0 #f8e3ef, 0 0 93.33333333333333px rgba(255, 255, 255, 0.65);
		transition: left 0.8s, box-shadow 0.8s;
		overflow: hidden;
		cursor: pointer;
	}
	.switch__toggle:before,
	.switch__toggle:after {
		content: '';
		height: 90%;
		width: 90%;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: -1;
		opacity: 0;
		transition: transition 0.8s, opacity 0.8s;
		background: rgba(255, 255, 255, 0.65);
		filter: blur(8px);
	}
	.switch__toggle:before {
		transform: translate(-50%, -50%) rotate(45deg);
	}
	.switch__toggle:after {
		transform: translate(-50%, -50%);
	}
	.switch__moon {
		width: 3.08px;
		height: 3.08px;
		display: block;
		position: absolute;
		left: 40%;
		top: 35%;
		background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
		box-shadow: 3.08px -3.08px 0 -0.88px rgba(248, 227, 239, 0.5);
		border-radius: 100%;
		transition: transform 0.8s, opacity 0.8s;
	}
	.switch__moon:before {
		content: '';
		width: 2.52px;
		height: 2.52px;
		display: block;
		position: absolute;
		left: -70%;
		top: 195%;
		background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
		box-shadow: 2.52px -2.52px 0 -0.8px rgba(248, 227, 239, 0.5);
		border-radius: 100%;
		transform: rotate(-60deg);
	}
	.switch__moon:after {
		content: '';
		width: 3.85px;
		height: 3.85px;
		display: block;
		position: absolute;
		left: 190%;
		top: 55%;
		background: linear-gradient(to bottom left, #f8e3ef, rgba(248, 227, 239, 0));
		box-shadow: 3.85px -3.85px 0 -0.88px rgba(248, 227, 239, 0.5);
		border-radius: 100%;
	}
	.switch__stars {
		width: 0.88px;
		height: 0.88px;
		display: block;
		position: absolute;
		left: 60%;
		top: 35%;
		background: #fff;
		box-shadow: 2.64px -2.64px 0 -0.33px #fff;
		filter: blur(0.5px);
		border-radius: 100%;
		transition: transform 0.8s, opacity 0.8s;
	}
	.switch__stars:before {
		content: '';
		width: 0.77px;
		height: 0.77px;
		display: block;
		position: absolute;
		left: 700%;
		top: 560%;
		background: #fff;
		box-shadow: 2.31px -2.31px 0 -0.33px #fff;
		filter: blur(0.5px);
		border-radius: 100%;
		transform: rotate(-75deg);
		transition: transform 0.8s, opacity 0.8s;
	}
	.switch__stars:after {
		content: '';
		height: 0.55px;
		width: 0.55px;
		position: absolute;
		left: 200%;
		top: 260%;
		opacity: 0;
		background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
		filter: blur(0.5px);
		border-radius: 100%;
		animation: falling-stars 6.4s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
		animation-delay: 3.2s;
	}
	.switch__clouds {
		height: 3.08px;
		width: 3.08px;
		background: #fff;
		position: absolute;
		top: 50%;
		left: -9.64px;
		display: block;
		transition: 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		border-radius: 50% 50% 0 50%;
	}
	.switch__clouds:before,
	.switch__clouds:after {
		content: '';
		height: 2.53px;
		width: 2.53px;
		background: #fff;
		position: absolute;
		border-radius: 50% 50% 0 50%;
		left: -33%;
		bottom: 0;
		box-shadow: inset 0.44px -0.22px 0 #f6f8f8;
	}
	.switch__clouds:after {
		height: 2.31px;
		width: 2.31px;
		left: auto;
		right: -30%;
		border-radius: 100%;
	}
	.switch__input {
		display: none;
	}
	.switch__input:checked + .switch__background {
		cursor: pointer;
		box-shadow: 0 3.85px 7.7px -1.76px rgba(33, 210, 242, 0.3);
	}
	.switch__input:checked + .switch__background:before {
		opacity: 0;
	}
	.switch__input:checked + .switch__background:after {
		opacity: 1;
	}
	.switch__input:checked + .switch__background .switch__toggle {
		left: 16.8px;
		box-shadow: inset 0 0 0.011px #fff, 0 0 3.52px #fff;
		animation: overlay 0s forwards;
		animation-delay: 0.4s;
	}
	.switch__input:checked + .switch__background .switch__toggle:before,
	.switch__input:checked + .switch__background .switch__toggle:after {
		opacity: 1;
		transition-delay: 0.4s;
	}
	.switch__input:checked + .switch__background .switch__toggle:before {
		transform: translate(-50%, -50%) rotate(45deg);
		animation: spin-before 12.8s linear infinite;
	}
	.switch__input:checked + .switch__background .switch__toggle:after {
		transform: translate(-50%, -50%);
		animation: spin-after 12.8s linear infinite;
	}
	.switch__input:checked + .switch__background .switch__moon {
		opacity: 0;
		transform: translate(-50%, 100%) rotate(30deg);
	}
	.switch__input:checked + .switch__background .switch__stars {
		opacity: 0;
		transform: translateX(-5.17px);
	}
	.switch__input:checked + .switch__background .switch__stars:before {
		opacity: 0;
		transform: translateX(-3.58px);
	}
	.switch__input:checked + .switch__background .switch__stars:after {
		animation: none;
	}
	.switch__input:checked + .switch__background .switch__clouds {
		transform: translateX(16.5px);
		transition-delay: 0.2s;
		animation: cloud-move 8s linear infinite;
		animation-delay: 1.6s;
	}
	.switch__input:checked + .switch__background .switch__clouds:before,
	.switch__input:checked + .switch__background .switch__clouds:after {
		animation: cloud-move 8s linear infinite;
		animation-delay: 1.6s;
	}

	@keyframes overlay {
		0% {
			overflow: hidden;
		}
		100% {
			overflow: visible;
		}
	}
	@keyframes spin-before {
		0% {
			transform: translate(-50%, -50%) rotate(45deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(405deg);
		}
	}

	@keyframes spin-after {
		0% {
			transform: translate(-50%, -50%) rotate(0);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
	@keyframes falling-stars {
		0% {
			width: 50%;
			opacity: 1;
			transform: translate(7px, -7px) rotate(-45deg);
		}
		5% {
			width: 400%;
			opacity: 1;
		}
		15% {
			box-shadow: -11px -3.3px 0 -0.33px #fff;
		}
		25%,
		100% {
			box-shadow: -11px -3.3px 0 -0.66px #fff;
			width: 400%;
			opacity: 0;
			transform: translate(-7.7px, 7.7px) rotate(-45deg);
		}
	}
	@keyframes cloud-move {
		0% {
			box-shadow: inset 4.4px -0.22px 0 #f6f8f8, -11px -5.1px 0.55px -0.22px rgba(33, 210, 242, 0);
		}
		50% {
			box-shadow: inset 4.4px -0.22px 0 #f6f8f8, -33px -5.1px 0.66px -0.22px #90e8f8;
		}
		90%,
		100% {
			box-shadow: inset 4.4px -0.4px 0 #f6f8f8, -3.3px -5.1px 1.65px 2px rgba(33, 210, 242, 0);
		}
	}
`;

/* Footer */
export const FooterStyled = styled.footer`
	padding: 3rem 0;
	margin: 5rem auto 0;
	background: ${({ theme }) => theme.backgroundGrey};
`;

export const FooterLogoWrapperStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	p {
		font-family: 'Equinor';
		font-size: 15px;
		padding: 0 0 0 0.3rem;
		font-weight: 600;
		color: ${({ theme }) => theme.text};
	}
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
	position: relative;

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

export const ParallaxItem = styled.div`
	position: absolute;
	width: 5rem;
	height: 5rem;
	transition: left 0.1s ease, top 0.1s ease;

	span {
		position: absolute;
		top: -1.2rem;
		/* left: 0.8rem; */
		font-size: 13px;
		font-family: 'Equinor';
		width: 100%;
		text-align: center;
		font-style: italic;
	}
`;

export const ParallaxSvgWrapper = styled.div<ParallaxSvgWrapperProps>`
	position: absolute;
	/* width: 100%; */
	transition: left 0.1s ease, top 0.1s ease;
	border: ${({ color }) => `1px solid #${color}`};
	left: 50%;
	transform: translateX(-50%);

	&:after,
	&:before {
		content: '';
		overflow: hidden;
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		background: ${({ color }) => `#${color}`};
		border-radius: 50%;
		transition: left 0.1s ease, top 0.1s ease;
	}

	&::after {
		top: calc(100% - 0.2rem);
		left: -0.3rem;
	}

	&::before {
		bottom: -0.3rem;
		right: -0.2rem;
	}

	span {
		position: absolute;

		&:after,
		&:before {
			content: '';
			overflow: hidden;
			position: absolute;
			width: 0.5rem;
			height: 0.5rem;
			background: ${({ color }) => `#${color}`};
			border-radius: 50%;
			transition: left 0.1s ease, top 0.1s ease;
		}

		&::after {
			top: 0.9rem;
			left: -0.3rem;
		}

		&::before {
			top: 0.9rem;
			right: -0.3rem;
		}
	}
`;

export const HeroButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 7rem;
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
		/* left: 0 !important; */
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
	padding: 7.5rem 0 4.5rem;
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

export const NotFoundWrapperStyled = styled.div`
	min-height: 60vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const NotFoundStyled = styled.div`
	width: 100%;
	max-width: 20rem;

	h1 {
		font-family: 'Equinor';
		font-size: 55px;
		font-weight: 600;
		color: ${({ theme }) => theme.text};
	}
`;
