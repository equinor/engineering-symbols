import { createPullstateCore } from 'pullstate';

import { SymbolUploadStore } from './SymbolsStore';

export const PullstateCore = createPullstateCore({
	SymbolUploadStore,
});
