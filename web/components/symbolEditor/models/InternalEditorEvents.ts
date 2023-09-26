export type InternalEvents = {
  mouse: {
    up: boolean;
    down: boolean;
  };
  worldObjects: {
    selectionChanged: boolean;
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
    },
    symbol: {
      load: false,
      unload: false,
    },
    worldObjects: {
      selectionChanged: false,
    },
    connector: {
      updated: [] as string[],
    },
    centerOfRotation: {
      updated: false,
    },
  };
}
