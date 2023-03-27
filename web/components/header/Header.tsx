import { Chip, Typography } from '@equinor/eds-core-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

import { version } from '../../package.json';

import { HeaderStyled, LogoWrapStyled, HeaderLogoStyled, NavStyled, BurgerWrapStyled, HeaderNoteStyled, NavStyledListItem } from './styles';

export const HeaderComponent: NextPage = () => {
	const [isMobileBurgerOpen, setMobileBurgerOpen] = useState<boolean>(false);
	const { pathname } = useRouter();

	console.log(111, version);

	return (
		<HeaderStyled>
			<LogoWrapStyled>
				<Link href="/">
					<HeaderLogoStyled>
						<Typography variant="h1_bold">Engineering symbols</Typography>
					</HeaderLogoStyled>
				</Link>
				<>
					{/* <a>{data.length > 0 && <Chip variant="active">{data[0].name}</Chip>}</a> */}
					<Chip variant="active">v.{version}</Chip>
				</>
			</LogoWrapStyled>

			<NavStyled isOpen={isMobileBurgerOpen}>
				<ul>
					<NavStyledListItem isActive={pathname === '/icons'}>
						<Link href="/icons">Icon</Link>
					</NavStyledListItem>
					<NavStyledListItem isActive={pathname === '/documentation'}>
						<Link href="/documentation">Documentation</Link>
					</NavStyledListItem>
				</ul>
			</NavStyled>

			<BurgerWrapStyled onClick={() => setMobileBurgerOpen(!isMobileBurgerOpen)} isOpen={isMobileBurgerOpen}>
				<svg version="1.1" height="100" width="100" viewBox="0 0 100 100">
					<path className="line line1" d="M 50,35 H 30"></path>
					<path className="line line2" d="M 50,35 H 70"></path>
					<path className="line line3" d="M 50,50 H 30"></path>
					<path className="line line4" d="M 50,50 H 70"></path>
					<path className="line line5" d="M 50,65 H 30"></path>
					<path className="line line6" d="M 50,65 H 70"></path>
				</svg>
			</BurgerWrapStyled>

			<HeaderNoteStyled>
				<p>Designed and built with ❤️</p>
			</HeaderNoteStyled>
		</HeaderStyled>
	);
};

export default HeaderComponent;
