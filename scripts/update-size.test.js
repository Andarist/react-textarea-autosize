const fs = require('fs');
const path = require('path');
const sizeLimit = require('size-limit');
const root = path.join(__dirname, '..');
const readmePath = path.join(root, 'README.md');
const readme = fs.readFileSync(readmePath, 'utf-8');
const pkg = require(path.join(root, 'package.json'));
const file = path.join(root, pkg.browser[pkg.module]);
const size = require('./update-size');

describe('size-limit', () => {
  it('check size to be object', () => {
    let resultData = {};
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result).toBeInstanceOf(Object);
      });
  });

  it('check gzip size limit', () => {
    let resultData = {};
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result.gzip).toBe(1673);
      });
  });

  it('check parsed size limit', () => {
    let resultData = {};
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result.parsed).toBe(4467);
      });
  });
});
