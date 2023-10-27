import { ConnectorsProps } from '../types';

export const getApiStructure: any = ({ id, key, iri, geometry, connectors, ...rest }: any) => {
	return {
		...Object.entries(rest).reduce((acc, [key, value]) => {
			if (key !== 'version' && key !== 'status' && key !== 'name') {
				acc[key] = value;
			}
			return acc;
		}, {}),
		identifier: key,
		label: key,
		shape: {
			serializations: geometry.map((value: string) => ({ type: 'SvgPathData', value })),
			// depictions: []
		},
		connectionPoints: connectors.map(({ id, relativePosition, direction }: ConnectorsProps) => ({
			identifier: id,
			position: relativePosition,
			direction,
		})),
	};
};
