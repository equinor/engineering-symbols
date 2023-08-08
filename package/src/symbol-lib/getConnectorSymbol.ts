import symbolLib from './source/symbol-library.json';

import { SymbolLibraryKey } from './source/symbol-library.types';
import { ConnectorSymbol } from './types';

export const symbolLibrary = symbolLib as Record<SymbolLibraryKey, Readonly<ConnectorSymbol>>;

function cloneConnectorSymbol(symbol: ConnectorSymbol): ConnectorSymbol {
	const clone: ConnectorSymbol = { ...symbol, connectors: [] };
	for (let i = 0; i < symbol.connectors.length; i++) {
		let c = symbol.connectors[i];
		clone.connectors.push({ ...c, relativePosition: { x: c.relativePosition.x, y: c.relativePosition.y } });
	}
	return clone;
}

export function getConnectorSymbol(id: SymbolLibraryKey): ConnectorSymbol | undefined {
	return id in symbolLibrary ? cloneConnectorSymbol(symbolLibrary[id]) : undefined;
}
