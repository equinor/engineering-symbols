import React from 'react';
import { render } from '@testing-library/react';

import { Icon } from './Icon';

describe('Test Icon component', () => {
	test('Icon show icon', () => {
		const { container } = render(
			<>
				<Icon name="arrow-up" />
			</>
		);
		const svg = container.querySelector('svg') as SVGElement;

		expect(svg).not.toBeNull();
	});
});
