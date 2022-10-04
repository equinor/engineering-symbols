import styled from 'styled-components';

export const ContainerStyled = styled.div`
	padding: 0 3.5rem;
`;

export const MainStyled = styled.main`
	// padding: 3rem 0;
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
