import { ChangeEvent, FunctionComponent, useRef } from 'react';
import { Search } from '@equinor/eds-core-react';
import { DebouncedState } from 'use-debounce';

import { WeatherLoader } from '../weatherLoader';
import { SymbolElement } from '../symbolElement';

import { isStatusDraft, isStatusRejected, isStatusIssued, isStatusReview } from '../../helpers';

import {
	SymbolsFilterWrapperStyled,
	SymbolsSearchWrapperStyled,
	SymbolsFilterLabelStyled,
	PanelSymbolsListStyled,
	ListWrapperStyled,
	UploadSvgStyled,
	ListStyled,
} from './styles';

import { ColorThemeProps, FilterStatusProps, SymbolsProps } from '../../types';
import { DefaultStatusesTypes } from '../../pages/manage/index.page';

type ListComponentProps = {
	handleCheckboxChange: (status: FilterStatusProps) => void;
	finishManageSymbols: boolean;
	onChangeFile: (file: File | null) => Promise<void>;
	searchValue: DebouncedState<(value: any) => void>;
	onReview: (symbol: SymbolsProps) => Promise<void>;
	onSubmit: (symbol: SymbolsProps) => Promise<void>;
	onDelete: (symbol: SymbolsProps) => Promise<void>;
	onUpdate: (symbol: SymbolsProps) => Promise<void>;
	statuses: DefaultStatusesTypes;
	onShow: (symbol: SymbolsProps) => Promise<void>;
	onEdit: (symbol: SymbolsProps) => Promise<void>;
	fileRef: any;
	theme: ColorThemeProps;
	icons: SymbolsProps[];
	show: boolean;
};

export const ListComponent: FunctionComponent<ListComponentProps> = ({
	handleCheckboxChange,
	finishManageSymbols,
	onChangeFile,
	searchValue,
	onUpdate,
	onReview,
	onSubmit,
	onDelete,
	statuses,
	fileRef,
	onShow,
	onEdit,
	icons,
	theme,
	show,
}): JSX.Element => {
	const svgElementsRef = useRef([]);

	const symbolMeny = (symbol: SymbolsProps) => [
		{
			name: isStatusDraft(symbol) ? 'Edit' : isStatusReview(symbol) ? 'View' : 'Revise',
			action: () => (isStatusDraft(symbol) ? onUpdate(symbol) : isStatusReview(symbol) ? onShow(symbol) : onEdit(symbol)),
			// isDisabled: !isStatusReview(symbol) && !isAdmin,
			// isDisabled: isStatusDraft(symbol) ? false : isStatusReview(symbol) ? !isAdmin : false,
		},
		{
			name: isStatusReview(symbol) ? 'Review' : 'Submit for review',
			action: () => (isStatusReview(symbol) ? onReview(symbol) : onSubmit(symbol)),
			isDisabled: !isStatusDraft(symbol) && !isStatusReview(symbol),
		},
		{
			name: 'Delete',
			action: () => onDelete(symbol),
			isDisabled: !isStatusDraft(symbol) && !isStatusRejected(symbol),
		},
	];

	const getChipsStatus = (symbol: SymbolsProps) => {
		if (isStatusIssued(symbol)) {
			return symbol.version;
		} else {
			return symbol.status;
		}
	};

	const onChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const file = target.files?.[0];
		if (file === undefined) return null;

		onChangeFile(file);
		target.value = '';
	};

	return (
		<ListStyled isShow={show}>
			<ListWrapperStyled>
				<SymbolsSearchWrapperStyled>
					<Search aria-label="sitewide" id="search-normal" placeholder="Search" onChange={({ target }) => searchValue(target.value)} />
				</SymbolsSearchWrapperStyled>

				<SymbolsFilterWrapperStyled>
					<SymbolsFilterLabelStyled checked={statuses.all}>
						<input type="checkbox" checked={statuses.all} onChange={() => handleCheckboxChange('all')} />
						All
					</SymbolsFilterLabelStyled>
					<SymbolsFilterLabelStyled checked={statuses.issued}>
						<input type="checkbox" checked={statuses.issued} onChange={() => handleCheckboxChange('issued')} />
						Issued
					</SymbolsFilterLabelStyled>
					<SymbolsFilterLabelStyled checked={statuses.review}>
						<input type="checkbox" checked={statuses.review} onChange={() => handleCheckboxChange('review')} />
						Review
					</SymbolsFilterLabelStyled>
					<SymbolsFilterLabelStyled checked={statuses.draft}>
						<input type="checkbox" checked={statuses.draft} onChange={() => handleCheckboxChange('draft')} />
						Draft
					</SymbolsFilterLabelStyled>
					<SymbolsFilterLabelStyled checked={statuses.reject}>
						<input type="checkbox" checked={statuses.reject} onChange={() => handleCheckboxChange('reject')} />
						Reject
					</SymbolsFilterLabelStyled>
				</SymbolsFilterWrapperStyled>

				<PanelSymbolsListStyled>
					<li>
						<UploadSvgStyled>
							<label htmlFor="file">Choose file to upload</label>
							<input type="file" id="file" ref={fileRef} name="file" accept=".svg" onChange={onChangeInput} />
						</UploadSvgStyled>
					</li>
					{!finishManageSymbols && <WeatherLoader />}
					{finishManageSymbols &&
						icons.length > 0 &&
						icons.map((symbol: SymbolsProps, id: number) => (
							<li key={id}>
								<SymbolElement
									svgElementsRef={svgElementsRef}
									chipsStatus={getChipsStatus(symbol)}
									height={symbol.height}
									paths={symbol.geometry}
									width={symbol.width}
									theme={theme}
									name={symbol.key}
									meny={symbolMeny(symbol)}
									id={symbol.id}
								/>
							</li>
						))}
				</PanelSymbolsListStyled>
			</ListWrapperStyled>
		</ListStyled>
	);
};
