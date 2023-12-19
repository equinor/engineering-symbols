// Config object to be passed to Msal on creation
import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
	auth: {
		clientId: '2e4ccc3b-9d87-4a03-af5f-ae1188027d40',
		authority: 'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0',
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
