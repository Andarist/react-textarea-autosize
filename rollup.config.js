import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/TextareaAutosize.js',
  dest: 'lib/TextareaAutosize.min.js',
  format: 'umd',
  moduleName: 'TextareaAutosize',
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-1', 'react'],
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    'react',
  ],
  globals: {
    react: 'React',
  },
};
