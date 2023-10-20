import styled from 'styled-components';

interface PanelDetailsStyledProps {
	isShow: boolean;
}

interface EditFromStyledProps {
	disabled: boolean;
}

export const PanelDetailsWrapperStyled = styled.div`
	/* overflow: scroll; */
	height: 100%;
`;

export const PanelDetailsStyled = styled.div<PanelDetailsStyledProps>`
	max-width: 30rem;
	/* max-width: 90%; */
	/* width: calc(50% - 7rem); */
	/* HOTFIX, same value in zoomButtons.ts */
	width: 340px;
	min-width: 7rem;
	height: calc(100% - 0.2rem);
	/* max-height: 28rem; */
	/* max-height: 30rem; */
	position: absolute;
	top: 0;
	border: 1px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	transform: ${({ isShow }) => (isShow ? 'translateY(0)' : 'translateY(10rem)')};
	opacity: ${({ isShow }) => (isShow ? '1' : '0')};
	z-index: ${({ isShow }) => (isShow ? '10' : '-1')};
	transition: 0.5s transform ease, 0.2s opacity ease;
	right: 0;
	margin: 0 auto 2rem;
	/* z-index: 10; */
	background: ${({ theme }) => theme.body};
	border-top-left-radius: 12px;
	border-bottom-left-radius: 12px;
	padding: 1.5rem 1.5rem;
	overflow-x: hidden;
	overflow-y: hidden;
`;

export const PanelDetailsButtons = styled.div`
	// display: grid;
	display: flex;
	/* position: absolute; */
	/* z-index: 10; */
	width: 300px;
	/* bottom: 0.5rem; */
	/* top: 21.5rem; */
	/* background-color: ${({ theme }) => theme.body}; */
	/* padding-left: 0; */
	/* padding: 0.8rem 0; */
	margin: 0;
	/* grid-template-rows: repeat(fit-content(150px)); */
	// grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	// gap: 1rem;
	flex-wrap: wrap;

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
		width: 100%;
	}
`;

export const EditPanelStyled = styled.div`
	// height: 100%;
`;

export const EditFromWrapper = styled.div<EditFromStyledProps>`
	position: relative;
	height: 100%;
	z-index: 10;
	// height: ${({ disabled }) => (disabled ? '100%' : '335px')};
	overflow: scroll;
	padding-bottom: ${({ disabled }) => (disabled ? '0' : '6rem')};
`;

export const EditFromButtonsWrapper = styled.div<EditFromStyledProps>`
	background-color: ${({ theme }) => theme.body};
	padding: 0.8rem 0;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: ${({ disabled }) => (disabled ? '0' : '120px')};
	z-index: 10;
`;

export const EditFromStyled = styled.div<EditFromStyledProps>`
	/* margin: ${({ disabled }) => (disabled ? '0' : '-5rem 0 -2rem')}; */
	/* margin: -5rem 0 -2rem; */
	height: 100%;

	form {
		padding: ${({ disabled }) => (disabled ? '0' : '0 0 1rem')};
		/* padding: 0 0 6rem; */
	}
`;
