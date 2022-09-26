import type { NextPage } from 'next';
import axios from 'axios';
import Head from 'next/head';
import remarkGfm from 'remark-gfm';

import ReactMarkdown from 'react-markdown';

import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Card, Chip } from '@equinor/eds-core-react';

interface ChangelogProps {
	body: string;
	tag_name: string;
	id: number;
}

const Changelog: NextPage = () => {
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		const getResponse = async () => {
			try {
				return await axios.get('https://api.github.com/repos/equinor/engineering-symbols/releases');
			} catch (error) {
				console.log(error);
			}
		};

		const getData = async () => {
			const res = await getResponse();

			if (!res) return;

			setData(res.data);
		};

		getData();
	}, []);

	console.log('DATA:', data);

	return (
		<div className={styles.container}>
			<Head>
				<title>1Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Changelog</h1>

				<div className={styles.changelog}>
					{data &&
						data.map(({ id, body, tag_name }: ChangelogProps) => (
							<div key={id} className={styles.changelogEl}>
								<p className={styles.changelogVer}>
									<Chip>{tag_name}</Chip>
								</p>
								<div className={styles.changelogDesc}>
									<Card>
										{/* eslint-disable react/no-children-prop */}
										<ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
									</Card>
								</div>
							</div>
						))}
				</div>
			</main>

			<footer className={styles.footer}>Footer 2</footer>
		</div>
	);
};

export default Changelog;
