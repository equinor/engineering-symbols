const fs = require('fs');

const lib = require('../__FIXTURE__/symbol-library.json');

// Make TSX?

async function convertingApiToSvg() {
	try {
		// const res = await fetch('https://api.publicapis.org/entries');
		// const res = await fetch(lib);
		// const json = await res.json();

		const { id, geometryString, width, height, connectors } = lib.ND0001;
		const hasConnectors = connectors && connectors.length > 0;

		const content = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g id="Symbol">
          <path d="${geometryString}" />
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
		await fs.writeFileSync(`converter/test/${id}.svg`, content);
	} catch (err) {
		console.log(err);
	}
}

convertingApiToSvg();
