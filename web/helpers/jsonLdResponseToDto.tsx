import { EngineeringSymbolDto } from '../types';

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
		id: id,
		iri: iri,
		version: valueOrDefault<string>(obj, ['pav:version']),
		previousVersion: null,
		previousVersionIri: null,
		dateTimeCreated: valueOrDefault<string>(obj, ['dc:created']),
		dateTimeModified: valueOrDefault<string>(obj, ['dc:modified']),
		dateTimeIssued: valueOrDefault<string>(obj, ['dc:issued']),

		identifier: valueOrDefault<string>(obj, ['dc:identifier']),
		label: valueOrDefault<string>(obj, ['rdfs:label']),
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
		shape: {
			serializations: valueOrDefault<object[]>(obj, ['sym:hasShape', 'sym:hasSerialization']).map((o) => ({
				type: shapeSerializationTypeMapper(valueOrDefault<string>(o, ['@type'])),
				value: valueOrDefault<string>(o, ['@value']),
			})),
			depictions: valueOrDefault<string[]>(obj, ['sym:hasShape', 'foaf:depiction'], []),
		},
		width: parseInt(valueOrDefault<string>(obj, ['sym:width'])),
		height: parseInt(valueOrDefault<string>(obj, ['sym:height'])),
		drawColor: valueOrDefault<string>(obj, ['sym:drawColor'], null),
		fillColor: valueOrDefault<string>(obj, ['sym:fillColor'], null),
		centerOfRotation: {
			x: parseFloat(valueOrDefault<string>(obj, ['sym:hasCenterOfRotation', 'sym:positionX'])),
			y: parseFloat(valueOrDefault<string>(obj, ['sym:hasCenterOfRotation', 'sym:positionY'])),
		},
		connectionPoints: toArray(valueOrDefault<object[]>(obj, ['sym:hasConnectionPoint'], []), (o) => ({
			identifier: valueOrDefault<string>(o, ['dc:identifier']),
			position: {
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
		if (useDefault !== undefined) {
			return useDefault!;
		}

		if (defaultIsUndefined) {
			return undefined!;
		}
		throw new Error('Did not find value for path: ' + path.join('.'));
	}

	return result as T;
}

function shapeSerializationTypeMapper(type: string) {
	switch (type) {
		case 'sym:svg-path-data':
			return 'svgPathData';

		default:
			return 'svgPathData';
	}
}
