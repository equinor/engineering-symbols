import { isObjEmpty } from './isObjEmpty';

type AnnotationsConnectorProps = {
	id: number;
	x: number;
	y: number;
};

const extractConnectorId = (id: string) => {
	const matches = id.match(/\d+$/);
	return matches ? matches[0] : '';
};

const transpileData = (input: any[]) => {
	const result: any = {
		symbol: {},
		annotations: {},
	};

	input.forEach(({ id, children }) => {
		if (id === 'Symbol' || id === 'Annotations') {
			const paths: string[] = [];
			const annotationsArray: { id: any; x: number; y: number; r: number }[] = [];

			children.forEach(({ id, cx, cy, r, tagName, d }: any) => {
				if (tagName === 'path' && typeof d === 'string') {
					paths.push(d);
				} else if (tagName === 'circle') {
					annotationsArray.push({ id, x: parseFloat(cx), y: parseFloat(cy), r: parseFloat(r) });
				}
			});

			if (paths.length > 0) {
				result.symbol.paths = paths;
			}

			if (annotationsArray.length > 0) {
				result.annotations.annotations = annotationsArray;
			}
		}
	});

	return result;
};

const findObjectsByIds = (obj: any) => {
	let result: any = [];

	function traverse(obj: { [x: string]: any }) {
		for (const key in obj) {
			if (key === 'id' && (obj[key] === 'Symbol' || obj[key] === 'Annotations')) {
				result.push(obj);
				break; // No need to continue searching in this object
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				traverse(obj[key]);
			}
		}
	}

	traverse(obj);

	return transpileData(result);
};

export const convertInputSvgObjectToAPIStructureObject = (inputObject: any, key: string) => {
	const viewBox = inputObject.viewBox.split(' ').map(parseFloat);
	const { symbol, annotations } = findObjectsByIds(inputObject) as any;

	const connectors = isObjEmpty(annotations)
		? []
		: annotations.annotations.map(({ id, x, y }: AnnotationsConnectorProps) => ({
				id,
				relativePosition: { x, y },
				direction: '90',
		  }));

	return {
		id: 'TBA',
		key,
		description: 'TBA',
		// dateTimeCreated: new Date(),
		// dateTimeUpdated: new Date(),
		// multy paths
		paths: symbol.paths,
		width: viewBox[2],
		height: viewBox[3],
		connectors,
		// connectors: inputObject.children[1].children[0].children
		// 	.filter(({ tagName }: any) => tagName === 'circle')
		// 	.map(({ id, cx, cy, r }: any) => ({
		// 		id: extractConnectorId(id),
		// 		relativePosition: {
		// 			x: parseFloat(cx),
		// 			y: parseFloat(cy),
		// 		},
		// 		// direction: parseFloat(r),
		// 		// TODO: do it in better way?
		// 		direction: '90',
		// 	})),
	};
};
