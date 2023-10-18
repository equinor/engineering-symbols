export type InternalEvents = {
	mouse: {
		up: boolean;
		down: boolean;
		wheelDelta: number;
	};
	worldObjects: {
		selectionChanged: boolean;
		hoverChanged: boolean;
	};
	symbol: {
		load: boolean;
		unload: boolean;
	};
	centerOfRotation: {
		updated: boolean;
	};
	connector: {
		updated: string[];
	};
};

export function getResetEvents(): InternalEvents {
	return {
		mouse: {
			up: false,
			down: false,
			wheelDelta: 0,
		},
		symbol: {
			load: false,
			unload: false,
		},
		worldObjects: {
			selectionChanged: false,
			hoverChanged: false,
		},
		connector: {
			updated: [] as string[],
		},
		centerOfRotation: {
			updated: false,
		},
	};
}
