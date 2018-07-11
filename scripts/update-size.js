const fs = require('fs');
const path = require('path');
const formatBytes = require('format-bytes');
const sizeLimit = require('size-limit');

const root = path.join(__dirname, '..');
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');

const pkg = require(path.join(root, 'package.json'));
const file = path.join(root, pkg.browser[pkg.module]);

sizeLimit(file, { ignore: ['react', 'prop-types'] }).then(bytes => {
  const weight = formatBytes(bytes.gzip);

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
