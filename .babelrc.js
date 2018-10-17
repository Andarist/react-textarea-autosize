const test = process.env.NODE_ENV === 'test';
const loose = true;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules: test ? 'commonjs' : false
      }
    ],
    '@babel/react'
  ],
  plugins: [
    ['@babel/proposal-class-properties', { loose }],
    ['@babel/proposal-object-rest-spread', { loose }],
    ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }],
    'macros'
  ]
};
