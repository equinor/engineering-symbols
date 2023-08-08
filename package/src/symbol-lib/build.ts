#!/usr/bin/env ts-node
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import symbolLib from './source/symbol-library.json';
import { SymbolLibraryKey } from './source/symbol-library.types';
import { ConnectorSymbol } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = join(__dirname, '..', 'svg');

console.log('Using SVG output dir:', outDir);
console.log('Removing old SVGs...');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir);

console.log("Creating new SVG files from 'symbol-library.json'...");

const symbolLibrary = symbolLib as Record<SymbolLibraryKey, Readonly<ConnectorSymbol>>;

for (const id in symbolLibrary) {
	const symbol = symbolLibrary[id as SymbolLibraryKey];
	writeFileSync(join(outDir, symbol.id + '.svg'), symbol.svgString, {
		flag: 'w',
	});
}

console.log('Done.');
