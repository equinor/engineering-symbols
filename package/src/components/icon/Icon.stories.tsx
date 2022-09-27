import React, { ReactElement, ReactNode } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { components, Icon, iconsName } from './Icon';

import './IconStories.css';

export default {
	title: 'Components/Icon',
	component: Icon,
	decorators: [(Story) => <>{Story()}</>],
	argTypes: {
		name: { control: { type: 'select' }, options: iconsName },
		appearance: { control: { type: 'select' } },
	},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Story = Template.bind({});

Story.args = {
	name: 'arrow-right',
	width: 50,
	height: 50,
	rotate: 0,
};

Story.storyName = 'Single icon';

const Square = ({ children }: { children: ReactNode }): ReactElement => {
	return <div className="square">{children}</div>;
};

const ThemedComponent = (): ReactElement => (
	<div className="container">
		{components &&
			Object.entries(components).map((el) => {
				const name = el[0];

				return (
					<Square key={name}>
						<Icon width={50} height={50} name={name} />
						<p>{name}</p>
					</Square>
				);
			})}
	</div>
);

const TemplateMap: ComponentStory<typeof Icon> = () => <ThemedComponent />;

export const StoryMap = TemplateMap.bind({});

StoryMap.storyName = 'All icons';
// TODO: fix console warning
// StoryMap.parameters = { controls: { disable: true } };
StoryMap.parameters = { name: { control: { disable: true } } };
// StoryMap.parameters = { controls: { exclude: ['name', 'width'] } };
