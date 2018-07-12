const path = require('path');

const pkg = require(path.join(__dirname, 'package.json'));
const file = path.join(__dirname, pkg.browser[pkg.module]);

module.exports = [
  {
    path: file,
    limit: '2.5 KB'
  }
];
