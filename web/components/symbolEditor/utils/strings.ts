import { customAlphabet } from 'nanoid';

import { SymbolConnectorInternal } from '../models/SymbolData';

export function generateRandomString(length: number, connectors: SymbolConnectorInternal[]): string {
	const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
	let newId = nanoid(length);

	// Check if the generated ID already exists, generate a new one until unique
	while (connectors.some((item) => item.id === newId)) {
		newId = nanoid(length);
	}

	return newId;
}
