'use client';

import { FC, useEffect, useRef } from 'react';
import { SymbolEditorEvent } from './models/EditorEvent';
import { EditorCommandMessage } from './models/EditorCommand';
import { World } from './World';

export type SymbolEditorProps = {
	editorEventHandler: (event: SymbolEditorEvent) => void;
	command?: EditorCommandMessage;
	style?: React.CSSProperties;
};

const defaultStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'grey',
};

const EngineeringSymbolEditor: FC<SymbolEditorProps> = ({ editorEventHandler, command, style }: SymbolEditorProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<World | null>(null);

	const containerStyle = style ?? defaultStyle;

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
		<div ref={containerRef} style={containerStyle}>
			<canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
		</div>
	);
};

export default EngineeringSymbolEditor;
