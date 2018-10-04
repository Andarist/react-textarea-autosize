const fs = require('fs');
const path = require('path');
const formatBytes = require('format-bytes');
const sizeLimit = require('size-limit');

const root = path.join(__dirname, '..');
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');
const sizeConfig = require('../.size-limit');

sizeLimit(sizeConfig[0].path, sizeConfig[0].ignore).then(bytes => {
  const weight = formatBytes(bytes.gzip);

  if (weight > sizeConfig[0].limit) {
    // eslint-disable-next-line no-console
    console.log(`\n⚠️  Project is now larger than ${sizeConfig[0].limit}\n`);
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
