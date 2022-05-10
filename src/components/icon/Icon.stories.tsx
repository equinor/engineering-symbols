/** @jsxImportSource @emotion/react */
import React, { ReactElement, ReactNode } from 'react';
import { css } from '@emotion/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { components, Icon, iconsName } from './Icon';

export default {
	title: 'Components/Icon',
	component: Icon,
	decorators: [(Story) => <>{Story()}</>],
	argTypes: {
		name: { control: { type: 'select' }, options: iconsName },
		appearance: { control: { type: 'select' } },
	},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} getPosition={(el) => el} />;

export const Story = Template.bind({});

Story.args = {
	name: 'arrow-right',
	width: 50,
	height: 50,
	rotate: 0,
};

Story.storyName = 'Single icon';

const Square = ({ children }: { children: ReactNode }): ReactElement => {
	const style = css`
		width: 12rem;
		height: 12rem;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 1rem;
		border-radius: 1rem;
		transition: all 0.3s ease-in-out;
		background: #fff;

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
			transform: scale(1.1);
		}
	`;
	return <div css={style}>{children}</div>;
};

const style = css`
	align-items: center;
	justify: flex-start;
	direction: row;
	flex-wrap: wrap;
`;

const ThemedComponent = (): ReactElement => (
	<div css={style}>
		{components &&
			Object.entries(components).map((el) => {
				const name = el[0];

				return (
					<Square key={name}>
						<Icon width={50} height={50} name={name} getPosition={(elem) => elem} />
						<p>{name}</p>
					</Square>
				);
			})}
	</div>
);

const TemplateMap: ComponentStory<typeof Icon> = () => <ThemedComponent />;

export const StoryMap = TemplateMap.bind({});

StoryMap.storyName = 'All icons';
StoryMap.parameters = { controls: { disable: true } };
