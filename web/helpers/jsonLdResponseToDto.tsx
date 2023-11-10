import { ConnectorsProps } from '../types';

export type EngineeringSymbolDto = {
	id: string;
	iri: string;
	key: string;
	name: string;
	status?: string;
	version: number;
	previousVersion?: string | null;
	previousVersionIri?: string | null;
	dateTimeCreated?: string;
	dateTimeModified?: string;
	dateTimeIssued?: string;
} & Omit<EngineeringSymbolPutDto, 'isRevisionOf'>;

/** Model for CREATING and UPDATING a symbol */
export type EngineeringSymbolPutDto = {
	identifier?: string;
	isRevisionOf?: string;
	label?: string;
	description: string;
	sources?: string[] | null;
	subjects?: string[] | null;
	userIdentifier?: string;
	creators: {
		name: string;
		email: string;
	}[];
	contributors: {
		name: string;
		email: string;
	}[];
	geometry: any;
	connectors: ConnectorsProps[];
	width: number;
	height: number;
	drawColor?: string;
	fillColor?: string;
	centerOfRotation: {
		x: number;
		y: number;
	};
};

export type ConnectionPoint = {
	identifier: string;
	position: {
		x: number;
		y: number;
	};
	direction: number;
};

export const jsonLdResponseToDto = (response: object): EngineeringSymbolDto[] => {
	if (!response) {
		throw new Error('jsonLdResponseToDto: response is null or undefined');
	}

	if ('@graph' in response && Array.isArray(response['@graph'])) {
		// Multiple symbols
		return response['@graph'].map(jsonLdSymbolToDto);
	} else if ('@id' in response) {
		// Single symbol
		return [jsonLdSymbolToDto(response)];
	}

	return [];
};

function jsonLdSymbolToDto(obj: object): EngineeringSymbolDto {
	const iri = valueOrDefault<string>(obj, ['@id']);
	const id = iri.split('/').pop();

	if (!id) throw new Error('jsonLdSymbolToDto: id is null or undefined');

	const result: EngineeringSymbolDto = {
		id,
		iri,
		version: parseInt(valueOrDefault<string>(obj, ['pav:version'])),
		// previousVersion: null,
		// previousVersionIri: null,
		dateTimeCreated: valueOrDefault<string>(obj, ['dc:created']),
		dateTimeModified: valueOrDefault<string>(obj, ['dc:modified']),
		dateTimeIssued: valueOrDefault<string>(obj, ['dc:issued']),

		key: valueOrDefault<string>(obj, ['dc:identifier']),
		name: valueOrDefault<string>(obj, ['rdfs:label']),
		description: valueOrDefault<string>(obj, ['dc:description']),
		sources: valueOrDefault<string[]>(obj, ['dc:source'], []),
		subjects: valueOrDefault<string[]>(obj, ['dc:subject'], []),
		creators: toArray(valueOrDefault<object[]>(obj, ['dc:creator'], []), (o) => ({
			name: valueOrDefault<string>(o, ['foaf:name']),
			email: valueOrDefault<string>(o, ['foaf:mbox']),
		})),
		contributors: toArray(valueOrDefault<object[]>(obj, ['dc:contributor'], []), (o) => ({
			name: valueOrDefault<string>(o, ['foaf:name']),
			email: valueOrDefault<string>(o, ['foaf:mbox']),
		})),
		geometry: valueOrDefault<object[]>(obj, ['sym:hasShape', 'sym:hasSerialization']).map((o) =>
			// type: shapeSerializationTypeMapper(
			//   valueOrDefault<string>(o, ["@type"])
			// ),
			valueOrDefault<string>(o, ['@value'])
		),
		width: parseInt(valueOrDefault<string>(obj, ['sym:width'])),
		height: parseInt(valueOrDefault<string>(obj, ['sym:height'])),
		// drawColor: valueOrDefault<string>(obj, ["sym:drawColor"], null),
		// fillColor: valueOrDefault<string>(obj, ["sym:fillColor"], null),
		centerOfRotation: {
			x: parseFloat(valueOrDefault<string>(obj, ['sym:hasCenterOfRotation', 'sym:positionX'])),
			y: parseFloat(valueOrDefault<string>(obj, ['sym:hasCenterOfRotation', 'sym:positionY'])),
		},
		connectors: toArray(valueOrDefault<object[]>(obj, ['sym:hasConnectionPoint'], []), (o) => ({
			id: valueOrDefault<string>(o, ['dc:identifier']),
			relativePosition: {
				x: parseFloat(valueOrDefault<string>(o, ['sym:positionX'])),
				y: parseFloat(valueOrDefault<string>(o, ['sym:positionY'])),
			},
			direction: parseFloat(valueOrDefault<string>(o, ['sym:connectorDirection'])),
		})),
	};

	const status = valueOrDefault<string>(obj, ['esmde:status'], undefined, true);

	if (status) {
		result.status = status;
	}

	const oid = valueOrDefault<string>(obj, ['esmde:oid'], undefined, true);

	if (oid) {
		result.userIdentifier = oid;
	}

	const previousVersionIri = valueOrDefault<string>(obj, ['pav:previousVersion', '@id'], undefined, true);

	if (previousVersionIri) {
		result.previousVersionIri = previousVersionIri;
		const versionGuid = previousVersionIri.split('/').pop();

		if (!versionGuid) {
			throw new Error('jsonLdSymbolToDto: previousVersionIri is not a valid IRI with a guid');
		}
		result.previousVersion = versionGuid;
	}

	return result;
}

function toArray<T>(obj: object, fn: (o: object) => T): T[] {
	return Array.isArray(obj) ? obj.map(fn) : [fn(obj)];
}

function valueOrDefault<T>(obj: object, path: string[], useDefault?: T | null, defaultIsUndefined = false): T {
	let current = obj;
	let result = undefined;

	for (const key of path) {
		if (current && key in current) {
			current = current[key as keyof typeof current];
			result = current;
		}
	}

	if (result === undefined || result === null) {
		if (useDefault !== undefined || defaultIsUndefined) {
			return useDefault!;
		}

		throw new Error('Did not find value for path: ' + path.join('.'));
	}

	return result as T;
}
