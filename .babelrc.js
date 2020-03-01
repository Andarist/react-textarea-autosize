const test = process.env.NODE_ENV === 'test';
const loose = true;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules: test ? 'commonjs' : false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/transform-runtime',
    [
      '@babel/proposal-object-rest-spread',
      { loose },
      'parcel seems to add some plugins in a way which conflicts with this one defined here (causing a duplicate)',
    ],
  ],
};
