import { Chip, Typography } from '@equinor/eds-core-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import { SignButtonComponent } from '../signButton/SignButton';
import { HeaderStyled, LogoWrapStyled, HeaderLogoStyled, NavStyled, BurgerWrapStyled, NavStyledListItem } from './styles';
import { ContainerStyled } from '../../styles/styles';

import { LogoComponent } from '../logo';

import packageJson from '../../package.json';
import { AuthenticatedTemplate } from '@azure/msal-react';

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
							<Link href="/symbols">Symbol library</Link>
						</NavStyledListItem>
						<NavStyledListItem isActive={pathname === '/documentation'}>
							<Link href="/documentation">Documentation</Link>
						</NavStyledListItem>
						<NavStyledListItem isActive={pathname === '/contribution'}>
							<Link href="/contribution">Contribution</Link>
						</NavStyledListItem>
						<AuthenticatedTemplate>
							<NavStyledListItem isActive={pathname === '/manage'}>
								<Link href="/manage">Manage symbols</Link>
							</NavStyledListItem>
						</AuthenticatedTemplate>
					</ul>
					<SignButtonComponent />
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

				{/* <SignInButton /> */}
			</HeaderStyled>
		</ContainerStyled>
	);
};

export default HeaderComponent;
