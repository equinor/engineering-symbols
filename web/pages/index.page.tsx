import type { NextPage } from 'next';
import Image from 'next/image';
import { Typography } from '@equinor/eds-core-react';

import { HeroStyled, HeroDescriptionStyled, InfoBoxesStyled, AvailableListStyled } from '../styles/styles';

const Home: NextPage = () => (
	<HeroStyled>
		<Typography variant="h1">
			<strong>Your new Engineering symbols library.</strong>
		</Typography>
		<HeroDescriptionStyled>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
			minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</HeroDescriptionStyled>

		<InfoBoxesStyled>
			<li>
				<Typography variant="h4">
					<strong>100%</strong>
				</Typography>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
			</li>
			<li>
				<Typography variant="h4">
					<strong>1077</strong>
				</Typography>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
			</li>
			<li>
				<Typography variant="h4">
					<strong>10.9k</strong>
				</Typography>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
			</li>
			<li>
				<Typography variant="h4">
					<strong>100 mil.</strong>
				</Typography>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
			</li>
		</InfoBoxesStyled>

		<AvailableListStyled>
			<li className="availableListText">
				<p>Available for:</p>
			</li>
			<li className="availableListReact">
				<Image src="/image/react.png" layout="fill" alt="hello" />
			</li>
			<li className="availableListFigma">
				<Image src="/image/figma.png" layout="fill" alt="hello" />
			</li>
			<li className="availableListCode">
				<Image src="/image/html-coding.png" layout="fill" alt="hello" />
			</li>
			<li className="availableListFlutter">
				<Image src="/image/flutter.png" layout="fill" alt="hello" />
			</li>
			<li className="availableListAdobe">
				<Image src="/image/adobe-illustrator.png" layout="fill" alt="hello" />
			</li>
		</AvailableListStyled>
	</HeroStyled>
);

export default Home;
