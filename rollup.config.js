import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const createConfig = ({
  output,
  umd = false,
  env,
} = {}) => {
  const min = env === 'production';

  return {
    input: 'src/index.js',
    output: ensureArray(output).map(format => Object.assign(
      {},
      format,
      {
        name: 'TextareaAutosize',
        exports: 'named',
      }
    )),
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      env && replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      min && uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      })
    ].filter(Boolean),
    external: makeExternalPredicate(umd ? external : allExternal),
    globals: {
      react: 'React',
    }
  };
};

export default [
  createConfig({
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ]
  }),
  createConfig({
    output: { file: pkg.unpkg.replace(/\.min\.js$/, '.js'), format: 'umd' },
    umd: true,
    env: 'development'
  }),
  createConfig({
    output: { file: pkg.unpkg, format: 'umd' },
    umd: true,
    env: 'production'
  }),
];
