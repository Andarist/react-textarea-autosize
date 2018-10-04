const fs = require('fs');
const path = require('path');
const sizeLimit = require('size-limit');
const root = path.join(__dirname, '..');
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');
const sizeConfig = require('../.size-limit')[0];
const byte = require('bytes');
sizeLimit(sizeConfig.path, sizeConfig).then(bytes => {
  const weight = byte.format(bytes.gzip);

  if (bytes.gzip > byte.parse(sizeConfig.limit)) {
    // eslint-disable-next-line no-console
    console.warn(`\n⚠️  Project is now larger than ${sizeConfig.limit}\n`);
  }

  fs.writeFileSync(
    readmePath,
    readme.replace(
      /<span class="weight">(.*?)<\/span>/,
      `<span class="weight">${weight}</span>`
    )
  );

  // eslint-disable-next-line no-console
  console.log(`\n📦  Measured weight: ${weight}.\n`);
});
