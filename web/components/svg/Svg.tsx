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
	// console.log(12, 'typeof', typeof path === 'string', path);

	const getSymbolPath = () => (path === undefined ? '' : typeof path === 'string' ? <path d={path} /> : path.map((pt: string) => <path d={pt} />));

	return (
		<SvgWrapStyled>
			<svg width={width} height={height} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} xmlns="http://www.w3.org/2000/svg" fill={fill}>
				<g id="Symbol">{getSymbolPath()}</g>
				{hasConnectors && (
					<g id="Annotations">
						{connectors.map(({ relativePosition, id }) => {
							return (
								<circle
									key={`annotation-connector-${id}`}
									id={`annotation-connector-${id}`}
									cx={relativePosition.x}
									cy={relativePosition.y}
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
