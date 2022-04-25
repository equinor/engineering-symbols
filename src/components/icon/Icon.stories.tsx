/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ReactElement, ReactNode } from 'react';

import { components, Icon } from './Icon';

export default {
	title: 'Components/Icon',
	component: Icon,
	decorators: [(Story) => <>{Story()}</>],
	argTypes: {
		name: { control: { type: 'select' } },
		appearance: { control: { type: 'select' } },
		size: { control: { type: 'inline-radio' } },
	},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => {
	return <Icon {...args} />;
};

export const Story = Template.bind({});

Story.args = {
	name: 'arrow-right',
	size: 's',
};

Story.storyName = 'Icon';

// Icon maps
const Square = ({ children,}: { children: ReactNode }): ReactElement => {
	const style = css`
		width: 12rem;
		height: 12rem;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	`;
	return <div css={style}>{children}</div>;
};

const style = css`
	align-items: center;
	justify: flex-start;
	direction: row;
	flex-wrap: wrap;
`;

const ThemedComponent = (): ReactElement => {
	return (
		<div css={style}>
			{components &&
				Object.entries(components).map((el) => {
					const name = el[0];

					return (
						<Square key={name}>
							{/* @ts-ignore */}
							<Icon size='l' name={name} />
							<p>{el[0]}</p>
						</Square>
				)})}
		</div>
	);
};


const TemplateMap: ComponentStory<typeof Icon> = () => {
	return <ThemedComponent />;
};

export const StoryMap = TemplateMap.bind({});

StoryMap.storyName = 'All icons';
