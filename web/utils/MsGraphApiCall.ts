import { PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig } from './authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

export async function getMsGraph() {
	const accounts = msalInstance.getAllAccounts();

	if (accounts.length <= 0) return;

	msalInstance.setActiveAccount(accounts[0]);
	if (!accounts[0]) {
		throw Error('No active account! Verify a user has been signed in and setActiveAccount has been called.');
	}

	const response = await msalInstance.acquireTokenSilent({
		...loginRequest,
		account: accounts[0],
	});

	const headers = new Headers();
	const bearer = `Bearer ${response.accessToken}`;

	return { headers, bearer };
}
