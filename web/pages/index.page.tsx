import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@equinor/eds-core-react';
import { useRouter } from 'next/router';

import { SvgComponent } from '../components';

import {
	HeroStyled,
	HeroDescriptionStyled,
	InfoBoxesStyled,
	AvailableListStyled,
	ContainerStyled,
	ParallaxItem,
	ParallaxContainer,
	HeroButtons,
	ButtonStyled,
	SecondSectionStyled,
	HalfContainerStyled,
	GetStartIllustrationStyled,
	GetStartContentStyled,
	WrapperStyled,
	GetStartButtons,
	ThirdSectionStyled,
	CaseStudiesStyled,
	CaseStudyStyled,
	CaseStudyImageStyled,
	CaseStudyTextStyled,
	CaseStudyWrapperStyled,
	FourthSectionStyled,
	TrustedByStyled,
	TrustedImageStyled,
	TrustedImagesStyled,
	FivethSectionStyled,
	AvailableForStyled,
	AvailableFormageStyled,
} from '../styles/styles';

import symbols from './symbol-library.json';
import Link from 'next/link';

const Home: NextPage = () => {
	const { push } = useRouter();

	const divRef = useRef(null);

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);

	useEffect(() => {
		const handleMouseMove = (event: { clientX: number; clientY: number }) => {
			setMousePos({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	useEffect(() => {
		if (Object.keys(windowSize).length >= 1) return;

		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	useEffect(() => {
		let top = 0;
		let left = 0;

		const { x, y } = mousePos;
		const { width, height } = windowSize;

		top = height * 0.1;
		left = width * 0.1;

		setTop(top);
		setLeft(left);

		// console.log('left:', left, 'left:', left);
	}, [windowSize, mousePos]);

	const onScrollIntoView = () => {
		if (!divRef.current) return;
		// @ts-ignore
		divRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<HeroStyled>
				<ContainerStyled>
					<Typography variant="h1">
						<strong>
							Your new
							<br /> <span>Engineering symbols</span> library.
						</strong>
					</Typography>
					<HeroDescriptionStyled>
						Our collection of vector-based engineering symbols provides you with an extensive range of graphic components that can be used
						to create professional-grade engineering diagrams and schematics.
						<br />
						{/* SVG symbols are designed to be flexible and easy to use, with a focus on clarity and precision. You can easily customize the size, color, and appearance of our symbols to suit your specific needs, and integrate them seamlessly into your existing projects. */}
					</HeroDescriptionStyled>

					<ParallaxContainer>
						{symbols.map(({ key, geometry, width, height }) => (
							<ParallaxItem key={key} top={top} left={left}>
								<SvgComponent width={width} height={height} viewBoxWidth={width} viewBoxHeight={height} path={geometry} fill="#000" />
							</ParallaxItem>
						))}
					</ParallaxContainer>

					<HeroButtons>
						<ButtonStyled onClick={() => push('/symbols')}>Symbols</ButtonStyled>
						<ButtonStyled onClick={() => onScrollIntoView()}>Explore more</ButtonStyled>
					</HeroButtons>
				</ContainerStyled>
			</HeroStyled>

			<SecondSectionStyled ref={divRef}>
				<ContainerStyled>
					<WrapperStyled>
						<HalfContainerStyled>
							<GetStartIllustrationStyled>
								<Image src="/gif/paper-boat.gif" layout="fill" alt="Paper boat" />
								{/* <Image src="/image/html-coding.png" layout="fill" alt="Paper boat" /> */}
							</GetStartIllustrationStyled>
						</HalfContainerStyled>
						<HalfContainerStyled>
							<GetStartContentStyled>
								<Typography variant="h3">
									Easy to Get
									<br />
									Started
								</Typography>
								<p>
									SVG symbols are designed to be flexible and easy to use, with a focus on clarity and precision. You can easily
									customize the size, color, and appearance of our symbols to suit your specific needs, and integrate them
									seamlessly into your existing projects.
								</p>
								<GetStartButtons>
									<ButtonStyled appearance="secondary" onClick={() => push('/symbols')}>
										Symbols
									</ButtonStyled>
									<ButtonStyled appearance="secondary" onClick={() => push('/documentation')}>
										See Documentation
									</ButtonStyled>
								</GetStartButtons>
							</GetStartContentStyled>
						</HalfContainerStyled>
					</WrapperStyled>
				</ContainerStyled>
			</SecondSectionStyled>

			<ThirdSectionStyled>
				<ContainerStyled>
					<CaseStudiesStyled>
						<Typography variant="h4">Case Studies</Typography>
						<p>
							Our library includes a wide variety of symbols that cover a broad range of engineering fields, including electrical,
							mechanical, civil engineering. Whether you need to create complex circuit diagrams or intricate flowcharts, our collection
							of symbols has you covered.
						</p>

						<WrapperStyled>
							{/* 1 */}
							<CaseStudyStyled>
								<CaseStudyWrapperStyled>
									<CaseStudyImageStyled>
										<Image src="/gif/echo-speaker.gif" layout="fill" alt="Paper boat" />
									</CaseStudyImageStyled>
									<CaseStudyTextStyled>
										<Typography variant="h6">
											<strong>Equinor</strong>
										</Typography>
										<p>Use Case - Facility Explorer</p>
									</CaseStudyTextStyled>
								</CaseStudyWrapperStyled>
							</CaseStudyStyled>
							{/* 2 */}
							<CaseStudyStyled>
								<CaseStudyWrapperStyled>
									<CaseStudyImageStyled>
										<Image src="/gif/honeycombs.gif" layout="fill" alt="Paper boat" />
									</CaseStudyImageStyled>
									<CaseStudyTextStyled>
										<Typography variant="h6">
											<strong>Webstep</strong>
										</Typography>
										<p>Use Case - Facility Explorer</p>
									</CaseStudyTextStyled>
								</CaseStudyWrapperStyled>
							</CaseStudyStyled>
							{/* 3 */}
							<CaseStudyStyled>
								<CaseStudyWrapperStyled>
									<CaseStudyImageStyled>
										<Image src="/gif/iceberg.gif" layout="fill" alt="Paper boat" />
									</CaseStudyImageStyled>
									<CaseStudyTextStyled>
										<Typography variant="h6">
											<strong>Dugtrio</strong>
										</Typography>
										<p>Use Case - Facility Explorer</p>
									</CaseStudyTextStyled>
								</CaseStudyWrapperStyled>
							</CaseStudyStyled>
						</WrapperStyled>
					</CaseStudiesStyled>
				</ContainerStyled>
			</ThirdSectionStyled>

			<FourthSectionStyled>
				<ContainerStyled>
					<TrustedByStyled>
						<Typography variant="h5">Trusted by Brands You Know</Typography>

						<TrustedImagesStyled>
							<TrustedImageStyled>
								<Link href="https://www.equinor.com/" target="_blank">
									<Image src="/image/equinor.png" layout="fill" alt="equinor" />
								</Link>
							</TrustedImageStyled>
							<TrustedImageStyled>
								<Link href="https://www.webstep.no/" target="_blank">
									<Image src="/image/webstep.png" layout="fill" alt="webstep" />
								</Link>
							</TrustedImageStyled>
						</TrustedImagesStyled>
					</TrustedByStyled>
				</ContainerStyled>
			</FourthSectionStyled>

			<FivethSectionStyled>
				<ContainerStyled>
					<TrustedByStyled>
						<Typography variant="h5">Available for</Typography>

						<AvailableForStyled>
							<AvailableFormageStyled>
								<Image src="/image/react.png" layout="fill" alt="equinor" />
							</AvailableFormageStyled>
							<AvailableFormageStyled>
								<Image src="/image/figma.png" layout="fill" alt="webstep" />
							</AvailableFormageStyled>
							<AvailableFormageStyled>
								<Image src="/image/html-coding.png" layout="fill" alt="webstep" />
							</AvailableFormageStyled>
							<AvailableFormageStyled>
								<Image src="/image/adobe-illustrator.png" layout="fill" alt="webstep" />
							</AvailableFormageStyled>
						</AvailableForStyled>
					</TrustedByStyled>
				</ContainerStyled>
			</FivethSectionStyled>

			{/* <InfoBoxesStyled>
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
					</InfoBoxesStyled> */}

			{/* <AvailableListStyled>
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
			</AvailableListStyled> */}
		</>
	);
};

export default Home;
