import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';
import css from 'rollup-plugin-import-css';
import svg from 'rollup-plugin-svg';

import packageJson from '../package.json';

export default {
	input: './src/index.ts',
	sourceMap: true,
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		nodeResolve({
			browser: true,
			preferBuiltins: false,
		}),
		svg(),
		css(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.build.json',
			sourceMap: true,
			inlineSources: true,
		}),
		cleaner({
			targets: ['./build/'],
		}),
	],
};
