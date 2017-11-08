import config from './rollup.config.js';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const umdConfig = Object.assign({}, config, {
  output: Object.assign({}, config.output, {
    format: 'umd',
    name: 'TextareaAutosize',
  }),
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  },
});

config.plugins.push(
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  })
);

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

export default umdConfig;
