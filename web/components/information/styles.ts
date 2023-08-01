import styled from 'styled-components';
import { AppearanceInformationTypes } from './Information.types';

interface PreviewStyledProps {
	appearance?: AppearanceInformationTypes;
	isShow: boolean;
}

export const InformationStyled = styled.div<PreviewStyledProps>`
	width: 400px;
	height: 12rem;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	box-shadow: ${({ theme }) => theme.boxShadow};
	transform: ${({ isShow }) => (isShow ? 'translateY(0)' : 'translateY(10rem)')};
	opacity: ${({ isShow }) => (isShow ? '1' : '0')};
	z-index: ${({ isShow }) => (isShow ? '10' : '-1')};
	transition: 0.5s transform ease, 0.2s opacity ease;
	left: 0;
	right: 0;
	margin: 0 auto 2rem;
	/* z-index: 10; */
	background: ${({ theme }) => theme.body};
	border-radius: 12px;

	${({ appearance, theme }) => {
		switch (appearance) {
			case 'error':
				return `
						border: 1px solid ${theme.backgroundRed};
					`;
			case 'success':
				return `
						border: 1px solid ${theme.backgroundGreen};
					`;

			default:
				return `
						border: 1px solid ${theme.backgroundGrey};
					`;
		}
	}}
`;

export const InformationCustomizeStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-self: start;
	height: 100%;
	/* box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px; */
	border-radius: 12px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

export const InformationCloseButtonStyled = styled.button`
	position: absolute;
	top: 1.5rem;
	right: 1.2rem;
	z-index: 10;
	appearance: none;
	background: transparent;
	border: none;
	transition: transform 0.3s ease;
	cursor: pointer;

	&:hover {
		transform: scale(1.25);
	}

	svg {
		width: 1rem;
		height: 1rem;
		fill: ${({ theme }) => theme.text};
	}
`;

export const InformationWrapStyled = styled.div`
	padding: 2rem;
	width: 25.5rem;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;

	button {
		margin: 2rem auto 0;
		height: auto;
	}
`;

export const InformationTitleStyled = styled.h3`
	margin: 0;
	font-family: 'Equinor';
	font-size: 24px;
`;

export const InformationContentStyled = styled.p`
	font-family: 'Equinor';
	font-size: 16px;
	display: inline-block;
	padding: 20px 0 0;

	a {
		text-decoration: underline;
	}
`;
