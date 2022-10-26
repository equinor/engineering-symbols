import type { NextPage } from 'next';
import Head from 'next/head';

import styles from './styles.module.css';

const Docs: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>🍯 Engineering symbols</title>
				<meta name="description" content="Your new Engineering symbols library." />
				<link rel="icon" href="/favicon.ico" />
				<meta name="robots" content="noindex,nofollow" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Docs</h1>
			</main>

			<footer className={styles.footer}>Footer 2</footer>
		</div>
	);
};

export default Docs;
