import styled from 'styled-components';

interface ListStyledProps {
	isShow: boolean;
}

interface SymbolsFilterProps {
	checked: boolean;
}

export const ListWrapperStyled = styled.div`
	/* overflow: scroll; */
	height: 100%;
`;

export const ListStyled = styled.div<ListStyledProps>`
	max-width: 30rem;
	/* max-width: 90%; */
	/* width: calc(50% - 7rem); */
	/* HOTFIX, same value in zoomButtons.ts */
	width: 400px;
	min-width: 7rem;
	height: calc(100% - 0.2rem);
	/* max-height: 28rem; */
	/* max-height: 30rem; */
	position: absolute;
	top: 0;
	border: 1px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	/* transform: translateY(0); */
	/* transform: ${({ isShow }) => (isShow ? 'translateX(0)' : 'translateX(-100rem)')}; */
	z-index: 10;
	transition: 0.5s left ease;
	left: ${({ isShow }) => (isShow ? '1rem' : '-26.4rem')};
	margin: 0 auto 2rem;
	/* z-index: 10; */
	background: ${({ theme }) => theme.body};
	border-radius: 12px;
	padding: 1.5rem;

	overflow: scroll;
	/* overflow-x: hidden; */
	/* overflow-y: hidden; */
`;

export const PanelSymbolsListStyled = styled.ul`
	list-style: none;
	display: grid;
	padding-left: 0;
	margin: 0;
	/* grid-template-rows: repeat(fit-content(150px)); */
	/* grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;

	li {
		transition: transform 0.3s ease;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}
	}
`;

export const UploadSvgStyled = styled.div`
	height: 170px;
	width: 100%;
	background: ${({ theme }) => theme.body};
	border: 1px solid #f2f2f2;
	border-radius: 12px;
	padding: 1rem;
	overflow: hidden;
	position: relative;

	input {
		display: none;
		visibility: hidden;
	}

	label {
		word-wrap: break-word;
		width: 100%;
		display: block;
		/* height: 40px; */
		text-align: center;
		/* padding: 0.2rem 0 0; */
		font-size: 18px;
		color: ${({ theme }) => theme.textBlackGrey};
		font-family: 'Equinor';
		padding-top: 90px;
		cursor: pointer;

		&:before,
		&:after {
			content: '';
			position: absolute;
			top: 33%;
			left: 50%;
			transform: translateX(-50%);
			width: 35%;
			height: 3px;
			background: ${({ theme }) => theme.backgroundGrey};
		}

		&:after {
			transform: rotate(90deg);
			left: calc(50% - 29px);
		}

		&:before {
		}
	}
`;

export const SymbolsSearchWrapperStyled = styled.div`
	margin-bottom: 1rem;

	/* Fix EDS styling */
	& > div > div {
		background: transparent;
		box-shadow: none;
	}

	input {
		border: 1px solid ${({ theme }) => theme.backgroundGrey};
		border-radius: 12px;
		appearance: none;
	}
`;

export const SymbolsFilterWrapperStyled = styled.div`
	margin-bottom: 2rem;
	display: inline-flex;
	align-items: baseline;

	p {
		font-family: 'Equinor';
		font-size: 13px;
		margin-right: 0.7rem;
	}
`;

export const SymbolsFilterLabelStyled = styled.div<SymbolsFilterProps>`
	margin: 0 0.3rem;
	font-family: 'Equinor';
	appearance: none;
	border: none;
	font-size: 13px;
	padding: 0.6rem 1rem;
	position: relative;
	white-space: nowrap;
	border-radius: 0.5rem;
	background: ${({ theme, checked }) => (checked ? theme.text : theme.backgroundGrey)};
	color: ${({ theme, checked }) => (checked ? theme.textWhite : theme.text)};
	cursor: pointer;
	transition: transform 0.3s ease, background 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
	}
`;
