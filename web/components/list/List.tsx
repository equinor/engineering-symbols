import { ChangeEvent, FunctionComponent, useRef } from 'react';
import { Search } from '@equinor/eds-core-react';
import { DebouncedState } from 'use-debounce';

import { WeatherLoader } from '../weatherLoader';
import { SymbolElement } from '../symbolElement';

import { isStatusDraft, isStatusRejected, isStatusPublished, isStatusReadyForReview } from '../../helpers';

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
	onChangeFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
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
			name: isStatusDraft(symbol) ? 'Edit' : isStatusReadyForReview(symbol) ? 'View' : 'Revise',
			action: () => (isStatusDraft(symbol) ? onUpdate(symbol) : isStatusReadyForReview(symbol) ? onShow(symbol) : onEdit(symbol)),
			// isDisabled: !isStatusReadyForReview(symbol) && !isAdmin,
			// isDisabled: isStatusDraft(symbol) ? false : isStatusReadyForReview(symbol) ? !isAdmin : false,
		},
		{
			name: isStatusReadyForReview(symbol) ? 'Review' : 'Submit for review',
			action: () => (isStatusReadyForReview(symbol) ? onReview(symbol) : onSubmit(symbol)),
			isDisabled: !isStatusDraft(symbol) && !isStatusReadyForReview(symbol),
		},
		{
			name: 'Delete',
			action: () => onDelete(symbol),
			isDisabled: !isStatusDraft(symbol) && !isStatusRejected(symbol),
		},
	];

	const getChipsStatus = (symbol: SymbolsProps) => {
		if (isStatusPublished(symbol)) {
			return symbol.version;
		} else {
			return symbol.status;
		}
	};

	return (
		<ListStyled isShow={show}>
			<ListWrapperStyled>
				<SymbolsSearchWrapperStyled>
					<Search aria-label="sitewide" id="search-normal" placeholder="Search" onChange={({ target }) => searchValue(target.value)} />
				</SymbolsSearchWrapperStyled>

				<SymbolsFilterWrapperStyled>
					<p>Show:</p>
					<SymbolsFilterLabelStyled checked={statuses.all}>
						<input type="checkbox" checked={statuses.all} onChange={() => handleCheckboxChange('all')} />
						All
					</SymbolsFilterLabelStyled>
					<SymbolsFilterLabelStyled checked={statuses.ready}>
						<input type="checkbox" checked={statuses.ready} onChange={() => handleCheckboxChange('ready')} />
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
							<input type="file" id="file" ref={fileRef} name="file" accept=".svg" onChange={onChangeFile} />
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
