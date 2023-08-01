import { Card } from '@equinor/eds-core-react';

import {
	SymbolElementWrapStyled,
	SymbolWrapperStyled,
	SymbolMenyWrapStyled,
	SymbolElementCardWrap,
	SymbolElementParagraphStyled,
	SymbolElementChipsStyled,
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
	geometry: string;
	height: number;
	width: number;
	theme: ColorThemeProps;
	name: string;
	id: string;
	meny: SymbolMenyProps[];
};

export const SymbolElement: React.FunctionComponent<SymbolElementProps> = ({
	svgElementsRef,
	chipsStatus,
	geometry,
	height,
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
							<SvgComponent viewBoxHeight={height} viewBoxWidth={width} height={95} width={95} fill={theme.fill} path={geometry} />
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
