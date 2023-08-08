import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import { loginRequest } from '../../utils/authConfig';

import Add from '../../svg/grid-add.svg';
import Minus from '../../svg/grid-minus.svg';

import { SignButtonStyled } from './styles';

export const SignButtonComponent = () => {
	const { instance, inProgress } = useMsal();

	const isAuthenticated = useIsAuthenticated();

	const handleLogin = () => {
		if (isAuthenticated) {
			instance.logoutPopup().catch((e) => {
				console.error(`logoutPopup failed: ${e}`);
			});
		} else {
			instance.loginPopup(loginRequest).catch((e) => {
				console.error(`loginPopup failed: ${e}`);
			});
		}
	};

	return (
		<SignButtonStyled onClick={() => handleLogin()}>
			{isAuthenticated ? <Minus /> : <Add />}
			{/* {isAuthenticated ? <><Cancel /><p>Logout</p></> : <><Flas /><p>Add symbols</p></>} */}
		</SignButtonStyled>
	);
};
