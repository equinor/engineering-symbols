import styled from 'styled-components';
import { StatusProps } from '../../types';

interface SymbolElementChipsProps {
	status: StatusProps | number;
}

export const SymbolElementWrapStyled = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	height: 100%;

	#Annotations > * {
		fill: none;
	}
`;

export const SymbolWrapperStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	padding: 0 0 0.5rem;

	svg {
		transition: all 0.3s easy;
	}
`;

export const SymbolMenyWrapStyled = styled.ul`
	position: absolute;
	border: 0.3rem solid ${({ theme }) => theme.body};
	background: ${({ theme }) => theme.backgroundGrey};
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-radius: 12px;
	opacity: 0;
	transform: scale(0.9);
	transition: opacity 0.3s ease, transform 0.3s ease;

	li {
		height: calc(100% / 3);
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover button {
			transform: scale(1.15);
		}

		&:nth-child(3) {
			background: ${({ theme }) => theme.background};
			z-index: -1;
			position: relative;
			border-bottom-left-radius: 12px;
			border-bottom-right-radius: 12px;

			button {
				color: ${({ theme }) => theme.textWhite};
			}
		}
	}

	button {
		appearance: none;
		background: transparent;
		border: none;
		font-family: 'Equinor';
		font-size: 14px;
		font-weight: 600;
		color: ${({ theme }) => theme.textBlackGrey};
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	li + li {
		border-top: 0.3rem solid ${({ theme }) => theme.body};
	}
`;

export const SymbolElementParagraphStyled = styled.p`
	text-align: center;
	word-wrap: break-word;
	height: 40px;
	padding: 0.2rem 0 0;
	font-size: 14px;
	color: ${({ theme }) => theme.textGrey};
	font-family: 'Equinor';
`;

export const SymbolElementCardWrap = styled.div`
	/* FIX FOR CARD @equinor/eds-core-react */

	& > div {
		height: 170px;
		width: 100%;
		background: ${({ theme }) => theme.body};
		border: 1px solid #f2f2f2;
		border-radius: 12px;
		padding: 1rem;
		overflow: hidden;
	}

	button {
		appearance: none;
		border: 0;
		margin: 0;
		padding: 0;
		border-radius: 0;
		background: none;
		height: 100%;
		width: 100%;

		&:disabled {
			opacity: 0.5;
		}
	}

	svg {
		transition: transform 0.3s ease;
	}

	&:hover ${SymbolMenyWrapStyled} {
		transform: scale(1);
		opacity: 1;
	}
`;

export const SymbolElementChipsStyled = styled.div<SymbolElementChipsProps>`
	&:before {
		position: absolute;
		top: 10px;
		right: 0;
		font-family: 'Equinor';
		font-size: 12px;
		font-weight: 400;
		border-top-width: 1px;
		border-left-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 0;
		border-radius: 10px 0 0 10px;
		border-style: solid;
		padding: 4px 8px;

		${({ status, theme }) => {
			if (Number(status) >= 2) {
				return `
					content: 'v. ${status}';
					color: ${theme.textWhite};
					border-color: ${theme.teal};
					background: ${theme.teal};
				`;
			}
			switch (status) {
				// case status >= 2:
				// 		return `
				// 		`
				case 'Draft':
					return `
						content: 'Draft';
						color: ${theme.textWhite};
						border-color: ${theme.textGrey};
						background: ${theme.textGrey};
					`;
				case 'ReadyForReview':
					return `
						content: 'Ready for review';
						color: ${theme.textWhite};
						border-color: ${theme.textWarning};
						background: ${theme.textWarning};
					`;

				case 'Rejected':
					return `
						content: 'Rejected';
						color: ${theme.textWhite};
						border-color: ${theme.textRed};
						background: ${theme.textRed};
					`;
				default:
			}
		}}
	}
`;
