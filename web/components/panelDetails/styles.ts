import styled from 'styled-components';

interface PanelDetailsStyledProps {
	isShow: boolean;
}

export const PanelDetailsWrapperStyled = styled.div`
	/* overflow: scroll; */
`;

export const PanelDetailsStyled = styled.div<PanelDetailsStyledProps>`
	max-width: 30rem;
	/* max-width: 90%; */
	width: calc(50% - 7rem);
	min-width: 7rem;
	height: 445px;
	/* max-height: 28rem; */
	/* max-height: 30rem; */
	position: absolute;
	top: 2rem;
	border: 1px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	transform: ${({ isShow }) => (isShow ? 'translateY(0)' : 'translateY(10rem)')};
	opacity: ${({ isShow }) => (isShow ? '1' : '0')};
	z-index: ${({ isShow }) => (isShow ? '10' : '-1')};
	transition: 0.5s transform ease, 0.2s opacity ease;
	right: 2rem;
	margin: 0 auto 2rem;
	/* z-index: 10; */
	background: ${({ theme }) => theme.body};
	border-radius: 12px;
	padding: 1.5rem 1.5rem;
	overflow-x: hidden;
	overflow-y: scroll;
`;

export const PanelDetailsButtons = styled.div`
	display: grid;
	position: sticky;
	z-index: 10;
	width: 100%;
	/* bottom: 0.5rem; */
	top: 21.5rem;
	background-color: ${({ theme }) => theme.body};
	/* padding-left: 0; */
	padding: 0.8rem 0;
	margin: 0;
	/* grid-template-rows: repeat(fit-content(150px)); */
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 1rem;

	&:before {
		content: '';
		position: absolute;
		z-index: 9;
		top: 0;
		left: -10%;
		height: 100%;
		width: 120%;
		background-color: ${({ theme }) => theme.body};
		border-top: 1px solid ${({ theme }) => theme.backgroundGrey};
	}

	button {
		/* margin: auto 0; */
		z-index: 11;
	}
`;

export const EditPanelStyled = styled.div``;

export const EditFromStyled = styled.div`
	margin: -5rem 0 -2rem;

	form {
		padding: 0 0 6rem;
	}
`;