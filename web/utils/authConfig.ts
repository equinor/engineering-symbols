// Config object to be passed to Msal on creation
import { BrowserAuthOptions, Configuration } from '@azure/msal-browser';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface MsalAuthConfigProps extends BrowserAuthOptions {
	scopes: string;
}

export const msalConfig: Configuration = {
	auth: {
		clientId: publicRuntimeConfig.NEXT_PUBLIC_MSAL_CLIENT_ID,
		authority: publicRuntimeConfig.NEXT_PUBLIC_MSAL_AUTHORITY,
		scopes: publicRuntimeConfig.NEXT_PUBLIC_API_SCOPE,
		redirectUri: '/',
		postLogoutRedirectUri: '/',
	} as MsalAuthConfigProps,
	system: {
		allowNativeBroker: false, // Disables WAM Broker
	},
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: [publicRuntimeConfig.NEXT_PUBLIC_API_SCOPE],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
