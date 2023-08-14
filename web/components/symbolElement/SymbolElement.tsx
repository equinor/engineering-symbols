import { Card } from '@equinor/eds-core-react';

import {
	SymbolElementParagraphStyled,
	SymbolElementChipsStyled,
	SymbolElementWrapStyled,
	SymbolElementCardWrap,
	SymbolMenyWrapStyled,
	SymbolWrapperStyled,
} from './styles';

import { SvgComponent } from '../svg';
import { ChipsStatusProps, ColorThemeProps } from '../../types';

type SymbolMenyProps = {
	name: string;
	action: (prop?: any) => void;
	isDisabled?: boolean;
};

type SymbolElementProps = {
	svgElementsRef: any;
	chipsStatus?: ChipsStatusProps;
	height: number;
	paths: string | string[];
	width: number;
	theme: ColorThemeProps;
	name: string;
	meny: SymbolMenyProps[];
	id: string;
};

export const SymbolElement: React.FunctionComponent<SymbolElementProps> = ({
	svgElementsRef,
	chipsStatus,
	height,
	paths,
	width,
	theme,
	name,
	meny,
	id,
}): JSX.Element => {
	return (
		<>
			<SymbolElementCardWrap>
				<Card>
					{chipsStatus && <SymbolElementChipsStyled status={chipsStatus} />}
					<SymbolElementWrapStyled>
						<SymbolWrapperStyled ref={(ref) => (svgElementsRef.current[id] = ref)}>
							<SvgComponent viewBoxHeight={height} viewBoxWidth={width} height={95} width={95} fill={theme.fill} path={paths} />
						</SymbolWrapperStyled>

						<SymbolMenyWrapStyled>
							{meny.map(({ name, action, isDisabled = false }) => (
								<li key={name}>
									<button disabled={isDisabled} onClick={action}>
										{name}
									</button>
								</li>
							))}
						</SymbolMenyWrapStyled>
					</SymbolElementWrapStyled>
				</Card>
				<SymbolElementParagraphStyled>{name}</SymbolElementParagraphStyled>
			</SymbolElementCardWrap>
		</>
	);
};
