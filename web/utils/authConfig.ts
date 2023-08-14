// Config object to be passed to Msal on creation
import { Configuration } from '@azure/msal-browser';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const msalConfig: Configuration = {
	auth: {
		clientId: publicRuntimeConfig.NEXT_PUBLIC_MSAL_CLIENT_ID,
		authority: publicRuntimeConfig.NEXT_PUBLIC_MSAL_AUTHORITY,
		redirectUri: '/',
		postLogoutRedirectUri: '/',
	},
	system: {
		allowNativeBroker: false, // Disables WAM Broker
	},
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: ['api://7584f051-6987-4c51-861d-77710537bd06/user_impersonation'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
