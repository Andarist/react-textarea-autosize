import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/TextareaAutosize.js',
  dest: 'dist/TextareaAutosize.min.js',
  format: 'umd',
  moduleName: 'TextareaAutosize',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
  ],
  external: [
    'react', 'prop-types'
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
};
