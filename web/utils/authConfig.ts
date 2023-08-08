// Config object to be passed to Msal on creation
import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
	auth: {
		clientId: process.env.NEXT_MSAL_CLIENT_ID as string,
		authority: process.env.NEXT_MSAL_AUTHORITY,
		redirectUri: '/',
		postLogoutRedirectUri: '/',
	},
	system: {
		allowNativeBroker: false, // Disables WAM Broker
	},
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: ['User.Read'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
