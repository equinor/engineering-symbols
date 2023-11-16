import { World } from './World';

export type InternalEditorEventHandlers = {
	windowResize: (e: UIEvent) => void;
	documentKeyDown: (e: KeyboardEvent) => void;
	documentKeyUp: (e: KeyboardEvent) => void;
	canvasWheel: (e: WheelEvent) => void;
	canvasMouseMove: (e: MouseEvent) => void;
	canvasMouseLeave: (e: MouseEvent) => void;
	canvasMouseEnter: (e: MouseEvent) => void;
	canvasMouseDown: (e: MouseEvent) => void;
	canvasMouseUp: (e: MouseEvent) => void;
	canvasClick: (e: MouseEvent) => void;
};

export function createWorldEventHandlers(w: World): InternalEditorEventHandlers {
	return {
		windowResize: handleWindowResize(w),
		documentKeyDown: handleDocumentKeyDown(w),
		documentKeyUp: handleDocumentKeyUp(w),
		canvasWheel: handleCanvasWheel(w),
		canvasMouseMove: handleCanvasMouseMove(w),
		canvasMouseLeave: handleCanvasMouseLeave(w),
		canvasMouseEnter: handleCanvasMouseEnter(w),
		canvasMouseDown: handleCanvasMouseDown(w),
		canvasMouseUp: handleCanvasMouseUp(w),
		canvasClick: handleCanvasClick(w),
	};
}

export function addWorldEventListeners(w: World) {
	window.addEventListener('resize', w.eventHandlers.windowResize);
	document.addEventListener('keydown', w.eventHandlers.documentKeyDown);
	document.addEventListener('keyup', w.eventHandlers.documentKeyUp);
	w.canvas.addEventListener('wheel', w.eventHandlers.canvasWheel);
	w.canvas.addEventListener('mousemove', w.eventHandlers.canvasMouseMove);
	w.canvas.addEventListener('mouseleave', w.eventHandlers.canvasMouseLeave);
	w.canvas.addEventListener('mouseenter', w.eventHandlers.canvasMouseEnter);
	w.canvas.addEventListener('mousedown', w.eventHandlers.canvasMouseDown);
	w.canvas.addEventListener('mouseup', w.eventHandlers.canvasMouseUp);
	w.canvas.addEventListener('click', w.eventHandlers.canvasClick);
}

export function removeWorldEventListeners(w: World) {
	window.removeEventListener('resize', w.eventHandlers.windowResize);
	document.removeEventListener('keydown', w.eventHandlers.documentKeyDown);
	document.removeEventListener('keyup', w.eventHandlers.documentKeyUp);
	w.canvas.removeEventListener('wheel', w.eventHandlers.canvasWheel);
	w.canvas.removeEventListener('mousemove', w.eventHandlers.canvasMouseMove);
	w.canvas.removeEventListener('mouseleave', w.eventHandlers.canvasMouseLeave);
	w.canvas.removeEventListener('mouseenter', w.eventHandlers.canvasMouseEnter);
	w.canvas.removeEventListener('mousedown', w.eventHandlers.canvasMouseDown);
	w.canvas.removeEventListener('mouseup', w.eventHandlers.canvasMouseUp);
	w.canvas.removeEventListener('click', w.eventHandlers.canvasClick);
}

function handleWindowResize(w: World) {
	return function (e: UIEvent) {
		w.updateCanvasSize();
	};
}

function handleDocumentKeyDown(w: World) {
	return function (e: KeyboardEvent) {
		if (w.mouse.isInCanvas) {
			e.preventDefault();
		}
		w.handleKeyUpOrDown(e);
	};
}

function handleDocumentKeyUp(w: World) {
	return function (e: KeyboardEvent) {
		if (w.mouse.isInCanvas) {
			e.preventDefault();
		}
		w.handleKeyUpOrDown(e);
	};
}

function handleCanvasWheel(w: World) {
	return function (e: WheelEvent) {
		e.preventDefault();
		w.events.mouse.wheelDelta = -e.deltaY;
	};
}

function handleCanvasMouseMove(w: World) {
	return function (e: MouseEvent) {
		w.setMousePos(e.clientX, e.clientY);
	};
}

function handleCanvasMouseLeave(w: World) {
	return function (e: MouseEvent) {
		w.mouse.isInCanvas = false;
		document.body.style.removeProperty('user-select');
	};
}

function handleCanvasMouseEnter(w: World) {
	return function (e: MouseEvent) {
		w.mouse.isInCanvas = true;
		document.body.style.userSelect = 'none';
	};
}

function handleCanvasMouseDown(w: World) {
	return function (e: MouseEvent) {
		if (e.button === 0 && w.mouse.isLeftButtonDown === false) {
			w.mouse.isLeftButtonDown = true;
			w.events.mouse.down = true;
		}
	};
}

function handleCanvasMouseUp(w: World) {
	return function (e: MouseEvent) {
		if (e.button === 0 && w.mouse.isLeftButtonDown === true) {
			w.mouse.isLeftButtonDown = false;
			w.events.mouse.up = true;
		}
	};
}

function handleCanvasClick(w: World) {
	return function (e: MouseEvent) {
		w.handleLeftMouseButtonClick(e.clientX, e.clientY);
	};
}
