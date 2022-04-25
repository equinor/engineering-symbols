# @equinor/engineering-symbols

### Example

```jsx
import { Icon } from '@equinor/engineering-symbols';

export const Page = (): ReactElement => {
	return (
		<>
			<Icon
				appearance="main"
				rotate={40}
				name="arrow-right"
				size="s"
			/>
		</>
	);
};
```

# Props

**Required props are marked with `*`.**

| Name              | Type                                                | Default    | Description                                |
| ----------------- | --------------------------------------------------- | ---------- | ------------------------------------------ |
| `appearance` | `IconAppearance`                         |     `main`       | Provides icon styling                      |
| `name`\* | `IconName`                           |            | Provides icon illustration                    |
| `size`   | `SvgSizeName`                                           | `m`    | Renders a icon with pre-declaration size                                |
| `rotate`     | `number`              | `0` | Renders a icon with pre-declaration rotate                          |


## Dependabot

### DON'T UPDATT MAJOR VERSION:

-   `@storybook/preset-create-react-app`
-   `react-scripts`

## PR's & releases version

Consistent title names help maintainers organise their projects better 📚

`Prefixes:`

-   `patch: patch,fixes,fix,chore,Bump`
-   `minor: feat`
-   `major: major`

Example: `chore: Update README.md`, | `fix: Colors for head`

## For development at the library

<details>
  <summary>Click to expand!</summary>
  
  ### Install Node.js

Install the latest [LTS] (https://nodejs.org) version of Node.js, and at the same time make sure you are on version 6 of the `npm`-CLI.

```sh
$ node -v && npm -v
v16.14.0
8.31.0
```

### Install Npm

```sh
$ npm install --global npm
```

### Install project dependencies

```sh
$ npm i
```

## Local development

```sh
$ npm run storybook
$ npm run dev # Runs up a local dev version of Storybook - Both good tools to use to quickly see changes along the way.
```

## Code quality

The project is set up with TypeScript, Eslint, Prettier, and the following is run when validating each pull request:

```sh
$ npm run checkcode
```

## Testing

We will write unit tests on critical functionality.

```sh
$ npm run test
```

## Construction

```sh
$ npm run build:storybook # Builds Storybook for static files, and deploys for Vercel for pull requests and merging for main
$ npm run build:lib # Packs the library (not Storybook) - This step is run before `npm publish` is run
```

</details>
