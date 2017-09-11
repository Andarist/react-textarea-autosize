import config from './rollup.config.js';
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
