import { ChangeEvent, FunctionComponent, useRef } from 'react';

import {
	ListStyled,
	ListWrapperStyled,
	PanelSymbolsListStyled,
	SymbolsFilterLabelStyled,
	SymbolsFilterWrapperStyled,
	SymbolsSearchWrapperStyled,
	UploadSvgStyled,
} from './styles';
import { WeatherLoader } from '../weatherLoader';
import { SymbolElement } from '../symbolElement';
import { ColorThemeProps, FilterStatusProps, SymbolsProps } from '../../types';
import { isStatusDraft, isStatusRejected, isStatusPublished, isStatusReadyForReview } from '../../helpers';
import { Search } from '@equinor/eds-core-react';
import { DebouncedState } from 'use-debounce';
import { DefaultStatusesTypes } from '../../pages/edit/index.page';

type ListComponentProps = {
	fileRef: any;
	theme: ColorThemeProps;
	finishManageSymbols: boolean;
	icons: SymbolsProps[];
	onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
	onUpdate: (symbol: SymbolsProps) => () => void;
	onShow: (symbol: SymbolsProps) => () => void;
	onEdit: (symbol: SymbolsProps) => () => void;
	onReview: (symbol: SymbolsProps) => Promise<void>;
	onSubmit: (symbol: SymbolsProps) => Promise<void>;
	onDelete: (symbol: SymbolsProps) => Promise<void>;
	searchValue: DebouncedState<(value: any) => void>;
	show: boolean;
	statuses: DefaultStatusesTypes;
	handleCheckboxChange: (status: FilterStatusProps) => void;
};

export const ListComponent: FunctionComponent<ListComponentProps> = ({
	fileRef,
	onChangeFile,
	finishManageSymbols,
	icons,
	theme,
	onUpdate,
	onShow,
	onEdit,
	onReview,
	onSubmit,
	onDelete,
	searchValue,
	show,
	statuses,
	handleCheckboxChange,
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
			// Check publish data
			// dateTimePublished

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
									meny={symbolMeny(symbol)}
									chipsStatus={getChipsStatus(symbol)}
									svgElementsRef={svgElementsRef}
									width={symbol.width}
									height={symbol.height}
									paths={symbol.geometry}
									id={symbol.id}
									theme={theme}
									name={symbol.key}
								/>
							</li>
						))}
				</PanelSymbolsListStyled>
			</ListWrapperStyled>
		</ListStyled>
	);
};
