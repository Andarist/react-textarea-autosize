const path = require('path');
const root = path.join(__dirname, '..');
const pkg = require(path.join(root, 'package.json'));
const file = path.join(root, pkg.browser[pkg.module]);
const size = require('./update-size');

describe('size-limit', () => {
  it('check size to be object', () => {
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result).toBeInstanceOf(Object);
      });
  });

  it('check gzip size limit', () => {
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result.gzip).toBe(1673);
      });
  });

  it('check parsed size limit', () => {
    return size
      .sizeLimit(file, { ignore: ['react', 'prop-types'] })
      .then(result => {
        expect(result.parsed).toBe(4467);
      });
  });
});
