const { writeFileSync } = require('fs');

async function convertingApiToSvg() {
	try {
		const symbols = async (val = '') => await (await fetch(`https://dev-engsym-api.azurewebsites.net/symbols/${val}`)).json();
		const symbolsJson = await symbols();

		const allSymbolsJson = symbolsJson.map(async ({ key, numberOfVersions }) => {
			const selectedSymbol = await symbols(key);
			const { description, geometry, width, height, connectors } = selectedSymbol;
			const hasConnectors = connectors && connectors.length > 0;

			const content = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <title>${key}</title>
          <desc>${description}. Version ${numberOfVersions}</desc>
          <g id="Symbol">
            <path d="${geometry}" />
          </g>
          ${
				hasConnectors &&
				`<g id="Annotations">
              ${connectors
					.map(({ relativePosition, id }) => {
						return `<circle
                  key="annotation-connector-${id}"
                  id="annotation-connector-${id}"
                  cx="${relativePosition.x}"
                  cy="${relativePosition.y}"
                  r="0.5"
                />`;
					})
					.join('')}
            </g>`
			}
          </svg>
        `;

			await writeFileSync(`svg/${key}.svg`, content);

			return selectedSymbol;
		});

		await Promise.all(allSymbolsJson).then((val) => {
			writeFileSync('web/data/symbols.json', JSON.stringify(val));
		});
	} catch (err) {
		console.log(err);
	}
}

convertingApiToSvg();
