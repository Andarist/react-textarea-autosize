module.exports = {
  singleQuote: true,
  overrides: [
    { files: 'src/**/*.js', options: { trailingComma: 'all' } },
    { files: '*.md', options: { poseWrap: 'always' } }
  ]
};
