import { SymbolsProps } from '../types';

export const isStatusReview = ({ status }: SymbolsProps) => status === 'Review';
export const isStatusIssued = ({ status }: SymbolsProps) => status === 'Issued';
export const isStatusRejected = ({ status }: SymbolsProps) => status === 'Rejected';
export const isStatusDraft = ({ status }: SymbolsProps) => status === 'Draft';
