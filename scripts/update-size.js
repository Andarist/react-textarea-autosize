const fs = require('fs');
const path = require('path');
const { transform } = require('@babel/core');
const { minify } = require('terser');
const gzipSize = require('gzip-size');
const formatBytes = require('format-bytes');

const pipe = (...funcs) =>
  funcs.reduceRight((piped, next) => (...args) => piped(next(...args)));

const getSize = pipe(
  dir => {
    const pkg = require(path.join(dir, 'package.json'));
    return path.join(dir, pkg.browser[pkg.module]);
  },
  file => fs.readFileSync(file, 'utf-8'),
  code =>
    transform(code, {
      babelrc: false,
      plugins: [['transform-define', { 'process.env.NODE_ENV': 'production' }]]
    }).code,
  code => minify(code, { toplevel: true }).code,
  gzipSize.sync
);

const root = path.join(__dirname, '..');
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');
const weight = formatBytes(getSize(root));

fs.writeFileSync(
  readmePath,
  readme.replace(
    /<span class="weight">(.*?)<\/span>/,
    `<span class="weight">${weight}</span>`
  )
);

// eslint-disable-next-line no-console
console.log(`\n📦  Measured weight: ${weight}.\n`);
