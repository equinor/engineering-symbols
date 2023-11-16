import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import { loginRequest } from '../../utils/authConfig';

import Add from '../../svg/grid-add.svg';
import Minus from '../../svg/grid-minus.svg';

import { SignButtonNoteStyled, SignButtonStyled, SignButtonWrapperStyled } from './styles';

export const SignButtonComponent = () => {
	const { instance, accounts, inProgress } = useMsal();

	const user = instance.getActiveAccount();

	console.log('👉', 'roles:', user?.idTokenClaims?.roles);

	const isAuthenticated = useIsAuthenticated();

	const handleLogin = () => {
		if (isAuthenticated) {
			instance.logoutPopup().catch((e) => {
				console.error(`logoutPopup failed: ${e}`);
			});
		} else {
			instance.loginRedirect(loginRequest).catch((e) => {
				console.error(`loginPopup failed: ${e}`);
			});
		}
	};

	return (
		<SignButtonWrapperStyled>
			{isAuthenticated ? (
				<>
					<SignButtonNoteStyled>{accounts.length === 1 && accounts[0].name}</SignButtonNoteStyled>
					<SignButtonStyled onClick={() => handleLogin()}>
						<Minus />
					</SignButtonStyled>
				</>
			) : (
				<SignButtonStyled onClick={() => handleLogin()}>
					<SignButtonNoteStyled>Login </SignButtonNoteStyled>
					<>
						<Add />
					</>
				</SignButtonStyled>
			)}
		</SignButtonWrapperStyled>
	);
};
