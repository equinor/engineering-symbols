import { EngineeringSymbolShape, EngineeringSymbolShapeSerializations } from '../types';

export const getPaths = ({ serializations }: EngineeringSymbolShape) => {
	return serializations.map((serialization: EngineeringSymbolShapeSerializations) => serialization.value).join('');
};
