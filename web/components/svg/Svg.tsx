import { SvgComponentProps } from './Svg.types';
import { SvgWrapStyled } from './styles';

export const SvgComponent: React.FunctionComponent<SvgComponentProps> = ({
	renderConnectors = false,
	viewBoxHeight,
	viewBoxWidth,
	connectors,
	height,
	width,
	fill,
	path,
}): JSX.Element => {
	const hasConnectors = renderConnectors && connectors && connectors.length > 0;
	const getSymbolPath = () =>
		path === undefined ? '' : typeof path === 'string' ? <path d={path} /> : path.map((pt: string, key: number) => <path key={key} d={pt} />);

	return (
		<SvgWrapStyled>
			<svg width={width} height={height} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg" fill={fill}>
				<g id="Symbol">{getSymbolPath()}</g>
				{hasConnectors && (
					<g id="Annotations">
						{connectors.map(({ position, identifier }) => {
							return (
								<circle
									key={`annotation-connector-${identifier}`}
									id={`annotation-connector-${identifier}`}
									cx={position.x}
									cy={position.y}
									r="0.5"
								/>
							);
						})}
					</g>
				)}
			</svg>
		</SvgWrapStyled>
	);
};
