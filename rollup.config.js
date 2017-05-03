import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const config = {
  format: 'umd',
  moduleName: 'TextareaAutosize',
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
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        screw_ie8: true
      }
    })
  );
}

export default config;
