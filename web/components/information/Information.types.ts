export type AppearanceInformationTypes = 'error' | 'success';

export type InformationComponentTypes = {
	appearance?: AppearanceInformationTypes;
	message?: string;
	title?: string;
	refresh?: number;
};
