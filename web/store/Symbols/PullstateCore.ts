import { createPullstateCore } from 'pullstate';

import { SymbolUploadStore, SymbolStore } from './SymbolsStore';

export const PullstateCore = createPullstateCore({
	SymbolUploadStore,
	SymbolStore,
});
