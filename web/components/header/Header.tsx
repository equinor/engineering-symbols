import { Chip, Typography } from '@equinor/eds-core-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import packageJson from '../../package.json';

import { HeaderStyled, LogoWrapStyled, HeaderLogoStyled, NavStyled, BurgerWrapStyled, HeaderNoteStyled, NavStyledListItem } from './styles';
import { ContainerStyled } from '../../styles/styles';
import { LogoComponent } from '../logo';

export const HeaderComponent: NextPage = () => {
	const [isMobileBurgerOpen, setMobileBurgerOpen] = useState<boolean>(false);
	const { pathname } = useRouter();

	return (
		<ContainerStyled>
			<HeaderStyled>
				<LogoWrapStyled>
					<Link href="/">
						<HeaderLogoStyled>
							<LogoComponent />
							<Typography variant="h1_bold">Engineering symbols</Typography>
						</HeaderLogoStyled>
					</Link>
					<>
						{/* TBA: Link to version => GH | website history */}
						<Chip variant="active">v.{packageJson.version}</Chip>
					</>
				</LogoWrapStyled>

				<NavStyled isOpen={isMobileBurgerOpen}>
					<ul>
						<NavStyledListItem isActive={pathname === '/symbols'}>
							<Link href="/symbols">Symbols</Link>
						</NavStyledListItem>
						<NavStyledListItem isActive={pathname === '/documentation'}>
							<Link href="/documentation">Documentation</Link>
						</NavStyledListItem>
						<NavStyledListItem isActive={pathname === '/contribution'}>
							<Link href="/contribution">Contribution</Link>
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
		</ContainerStyled>
	);
};

export default HeaderComponent;
