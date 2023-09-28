import { FC, useEffect, useRef } from 'react';
import { SymbolEditorEvent } from './models/EditorEvent';
import { EditorCommandMessage } from './models/EditorCommand';
import { World } from './World';
import { SymbolEditorStyles } from './styles';

export type SymbolEditorProps = {
	editorEventHandler: (event: SymbolEditorEvent) => void;
	command?: EditorCommandMessage;
};

export const SymbolEditor: FC<SymbolEditorProps> = ({ editorEventHandler, command }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<World | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const world = new World(canvasRef.current);

			world.addListener(editorEventHandler);
			editorRef.current = world;
		} else {
			console.error('Canvas element is null');
		}
		return () => {
			editorRef.current?.dispose();
		};
	}, []);

	useEffect(() => {
		if (editorRef.current && command) {
			editorRef.current.dispatchCommand(command);
		}
	}, [command]);

	return (
		<div ref={containerRef}>
			<SymbolEditorStyles>
				<canvas ref={canvasRef}></canvas>
			</SymbolEditorStyles>
		</div>
	);
};
