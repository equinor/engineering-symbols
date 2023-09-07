import { createPullstateCore } from 'pullstate';

import { SymbolUploadStore, SymbolsStore, ManageSymbolsStore } from './SymbolsStore';

export const PullstateCore = createPullstateCore({
	ManageSymbolsStore,
	SymbolUploadStore,
	SymbolsStore,
});
