import { Typography } from '@equinor/eds-core-react';
import type { NextPage } from 'next';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';

import DOC from './documentation.md';

import styles from './styles.module.css';

import { IconsHeaderStyled } from '../icons/styles';

const Documentation: NextPage = () => {
	return (
		<>
			<IconsHeaderStyled>
				<Typography variant="h1_bold" style={{ textAlign: 'center' }}>
					Documentation
				</Typography>
			</IconsHeaderStyled>

			{/* <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} /> */}
			<div className={styles.markdownBody}>
				<MDXProvider>
					<DOC />
				</MDXProvider>
			</div>
		</>
	);
};

export default Documentation;
