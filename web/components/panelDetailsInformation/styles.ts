import styled from 'styled-components';

export const PanelDetailsInformationContainer = styled.p`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: -2rem;
	font-size: 13px;
	left: 50%;
	transform: translate(-50%);
	padding: 0.6rem 0.8rem 0.8rem;
	border-radius: 12px;
	border: 1.5px solid ${({ theme }) => theme.backgroundGrey};
	box-shadow: ${({ theme }) => theme.boxShadow};
	background: ${({ theme }) => theme.body};
	text-align: center;
`;
