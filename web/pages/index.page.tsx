import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@equinor/eds-core-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { ButtonComponent, SvgComponent } from '../components';

import {
	GetStartIllustrationStyled,
	AvailableFormageStyled,
	CaseStudyWrapperStyled,
	GetStartContentStyled,
	HeroDescriptionStyled,
	CaseStudyImageStyled,
	TrustedImagesStyled,
	FivethSectionStyled,
	SecondSectionStyled,
	HalfContainerStyled,
	FourthSectionStyled,
	CaseStudyTextStyled,
	AvailableForStyled,
	ThirdSectionStyled,
	TrustedImageStyled,
	ParallaxSvgWrapper,
	CaseStudiesStyled,
	ParallaxContainer,
	ContainerStyled,
	CaseStudyStyled,
	GetStartButtons,
	TrustedByStyled,
	WrapperStyled,
	ParallaxItem,
	HeroButtons,
	HeroStyled,
} from '../styles/styles';

import symbols from './symbol-library.json';

import { HomePageProps } from '../types';

const parallaxItemsPostion = [
	{
		top: 15,
		left: 20,
		color: 'ff6961',
		text: 'Fill',
	},
	{
		top: 21,
		left: 79,
		color: 'ffb480',
		text: 'Connectors',
	},
	{
		top: 5,
		left: 35,
		color: 'f8f38d',
		text: 'Size',
	},
	{
		top: 10,
		left: 55,
		color: '42d6a4',
		text: 'Path',
	},
	{
		top: 55,
		left: 10,
		color: '08cad1',
		text: 'Shape',
	},
	{
		top: 72,
		left: 23,
		color: '59adf6',
		text: 'Coordinates',
	},
	{
		top: 79,
		left: 69,
		color: '9d94ff',
		text: 'Scale',
	},
	{
		top: 62,
		left: 87,
		color: 'c780e8',
		text: 'Rotation',
	},
];

const Home: NextPage<HomePageProps> = ({ theme }) => {
	const { push } = useRouter();

	const scrollToRef = useRef(null);

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);

	const handleWindowResize = () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	};

	useEffect(() => {
		const handleMouseMove = (event: { clientX: number; clientY: number }) => {
			setMousePos({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	// useEffect(() => {
	// 	if (Object.keys(windowSize).length >= 1) return;

	// 	setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	// }, []);

	// useEffect(() => {
	// 	window.addEventListener('resize', handleWindowResize);

	// 	return () => {
	// 		window.removeEventListener('resize', handleWindowResize);
	// 	};
	// }, []);

	useEffect(() => {
		let top = 1;
		let left = 1;

		const { x, y } = mousePos;
		const { width, height } = windowSize;

		handleWindowResize();

		if (width === 0 || height === 0) return;

		const centerX = width / 2;
		const centerY = height / 2;

		const deviationX = x / centerX - 1;
		const deviationY = y / centerY - 1;
		// left === right
		left = deviationX * 0.03;
		top = deviationY * 0.05;

		setTop(top);
		setLeft(left);
	}, [mousePos]);

	const onScrollIntoView = () => {
		if (!scrollToRef.current) return;
		// @ts-ignore
		scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const getTop = (i: number) => {
		return parallaxItemsPostion[i].top * top + parallaxItemsPostion[i].top + Math.random() * 0.1 + '%';
	};

	const getLeft = (i: number) => {
		return parallaxItemsPostion[i].left * left + parallaxItemsPostion[i].left + Math.random() * 0.1 + '%';
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
						{symbols.map(({ key, paths, width, height }, i) => (
							<ParallaxItem key={key} style={{ top: getTop(i), left: getLeft(i) }}>
								<span>{parallaxItemsPostion[i].text}</span>
								<ParallaxSvgWrapper color={parallaxItemsPostion[i].color}>
									<SvgComponent
										width={width}
										height={height}
										viewBoxWidth={width}
										viewBoxHeight={height}
										path={paths}
										fill={theme.fill}
									/>
									<span></span>
								</ParallaxSvgWrapper>
							</ParallaxItem>
						))}
					</ParallaxContainer>

					<HeroButtons>
						<ButtonComponent onClick={() => push('/symbols')}>Symbols</ButtonComponent>
						<ButtonComponent onClick={() => onScrollIntoView()}>Explore more</ButtonComponent>
					</HeroButtons>
				</ContainerStyled>
			</HeroStyled>

			<SecondSectionStyled ref={scrollToRef}>
				<ContainerStyled>
					<WrapperStyled>
						<HalfContainerStyled>
							<GetStartIllustrationStyled>
								<Image src="/gif/paper-boat.gif" layout="fill" alt="Paper boat" />
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
									<ButtonComponent appearance="secondary" onClick={() => push('/symbols')}>
										Symbols
									</ButtonComponent>
									<ButtonComponent appearance="secondary" onClick={() => push('/documentation')}>
										See Documentation
									</ButtonComponent>
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
									<Image src="/image/webstep.png" layout="fill" alt="webstep" />
									{/* <Image
										src="/image/eqnr.png"
										width={0}
										height={0}
										sizes="100vw"
										style={{ width: '100%', height: 'auto' }}
										alt="webstep"
									/> */}
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
		</>
	);
};

export default Home;
