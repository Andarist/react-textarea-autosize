import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const env = process.env.NODE_ENV;

const config = {
  input: 'example/index.js',
  output: {
    file: 'example/bundle.js',
    format: 'umd',
  },
  plugins: [
    nodeResolve({
      jsnext: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

export default config;
