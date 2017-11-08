import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const config = {
  output: {
    format: process.env.BABEL_ENV,
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    'react', 'prop-types'
  ],
};

export default config;
