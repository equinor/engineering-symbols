import styled from 'styled-components';

export const DarkModeSwitcherStyled = styled.div`
	margin: 1rem auto 0 0;
	position: absolute;
	right: 3rem;
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

export const ContainerStyled = styled.div`
	padding: 0 3.5rem;
	max-width: 1440px;
	margin: 0 auto;
`;

export const HeroStyled = styled.div`
	min-height: calc(100vh - 13rem);

	h1 {
		font-size: 80px;
		padding: 6rem 0 4rem;
		text-align: center;

		@media screen and (max-width: 1023px) {
			font-size: 60px;
			padding: 2rem 0;
		}
	}
`;

export const HeroDescriptionStyled = styled.p`
	color: rgba(0, 0, 0, 0.6);
	text-align: center;
	padding: 0 16rem;
	line-height: 1.8;

	@media screen and (max-width: 1023px) {
		padding: 0 5rem;
	}
`;

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
