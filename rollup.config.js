import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const env = process.env.NODE_ENV;

const config = {
  format: process.env.BABEL_ENV,
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  external: [
    'react', 'prop-types'
  ],
};

export default config;
