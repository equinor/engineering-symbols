import { SymbolsProps } from '../types';

export const isStatusReadyForReview = ({ status }: SymbolsProps) => status === 'Review';
export const isStatusPublished = ({ status }: SymbolsProps) => status === 'Issued';
export const isStatusRejected = ({ status }: SymbolsProps) => status === 'Rejected';
export const isStatusDraft = ({ status }: SymbolsProps) => status === 'Draft';
