## Basic Usage

You can download the engineering symbols library from our website. The library will be in the form of an SVG file, which can be opened in any software that supports vector graphics, such as Adobe Illustrator or Inkscape. Once you have access to the library, you can use the engineering symbols in your technical drawings, diagrams, or any other engineering-related visuals. Simply drag and drop the symbols onto your canvas, or copy and paste them from the library file. It's important to keep in mind the meaning and context of each symbol when using them. Most engineering symbols have specific definitions and are used to convey specific information. Make sure you understand the symbols you are using and use them appropriately.

Additionally, the icons are available via the `equinor` NPM package:

## React

If you prefer to use the library in your web project, a React library is available to install under the name `@equinor/engineering-symbols`. For more details, see the package [README](https://github.com/equinor/engineering-symbols/blob/master/package/README.md) and you can install it from a package manager like `NPM` or `Yarn`. Simply run the command `npm install @equinor/engineering-symbols --save` in your terminal.

```bash
yarn add equinor/engineering-symbols
# or
npm i equinor/engineering-symbols
```

Example usage:

```jsx
import { Icon } from '@equinor/engineering-symbols';

export const Page = (): ReactElement => {
	return (
		<>
			<Icon name="PP007A" height={50} width={50} fill="aqua" />
		</>
	);
};
```

## CSS

Download the engineering symbols library in SVG format from our website or package manager. Include the SVG file in your HTML code using the <img> tag, like this:

```html
<img src="static/svg/engineering-symbol.svg" alt="Engineering Symbol" />
```

In your CSS code, you can reference the individual symbols in the SVG file using the `background-image` property, like this:

```css
.icon1 {
	background-image: url('static/svg/symbol1.svg');
}

.icon2 {
	background-image: url('static/svg/symbol2.svg');
}
```

To use the symbols in your HTML, simply add the class name to the element, like this:

```html
<div class="icon1"></div>
<div class="icon2"></div>
```

You can style the symbols further by adjusting the background-size, background-position, and other properties as needed.
It's important to keep in mind that the symbols may have different dimensions and proportions, so you may need to adjust your CSS code accordingly.

<!-- ## API -->

<!-- ## Figma

Install the [engineering symbols plugin](https://github.com/) in Figma from the plugin directory.
Once the plugin is installed, open it from the Figma menu or by using the keyboard shortcut.
In the plugin interface, you will see a list of engineering symbols that you can use in your Figma project. Simply click on the symbol you want to use to add it to your canvas.
You can customize the symbol by adjusting its size, color, stroke, and other properties using the Figma design tools.
You can also add multiple symbols to your canvas and arrange them as needed to create technical drawings, diagrams, or any other engineering-related visuals.
When you are finished, you can export your design from Figma in a variety of formats, such as PNG, SVG, or PDF, depending on your needs. -->

## License

[License](../../../LICENSE)
