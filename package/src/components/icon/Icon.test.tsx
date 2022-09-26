import { render } from '@testing-library/react';

import { Icon } from './Icon';

describe('Test Icon component', () => {
	test('Show icon', () => {
		const { container } = render(
			<>
				<Icon width={50} height={50} name="arrow-up" getPosition={(el) => el} />
			</>
		);
		const svg = container.querySelector('svg') as SVGElement;

		expect(svg).not.toBeNull();
	});
});
