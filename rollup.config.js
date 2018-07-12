import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const ensureArray = maybeArr =>
  Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const createConfig = ({ output, browser = true, umd = false, env } = {}) => {
  const min = env === 'production';

  return {
    input: 'src/index.js',
    output: ensureArray(output).map(format =>
      Object.assign({}, format, {
        name: 'TextareaAutosize',
        exports: 'named',
        globals: {
          react: 'React'
        }
      })
    ),
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      commonjs(),
      replace(
        Object.assign(
          env ? { 'process.env.NODE_ENV': JSON.stringify(env) } : {},
          {
            'process.env.BROWSER': JSON.stringify(browser)
          }
        )
      ),
      min &&
        uglify({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }
        })
    ].filter(Boolean),
    external: makeExternalPredicate(umd ? external : allExternal)
  };
};

const configs = {
  browser: {
    output: [
      { file: pkg.browser[pkg.main], format: 'cjs' },
      { file: pkg.browser[pkg.module], format: 'esm' }
    ]
  },
  regular: {
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    browser: false
  },
  umd_prod: {
    output: { file: pkg.unpkg.replace(/\.min\.js$/, '.js'), format: 'umd' },
    umd: true,
    env: 'development'
  },
  umd: {
    output: { file: pkg.unpkg, format: 'umd' },
    umd: true,
    env: 'production'
  }
};

const buildTypes = Object.keys(configs);
const { ROLLUP_BUILDS = buildTypes.join(',') } = process.env;
const builds = ROLLUP_BUILDS.split(',');

export default buildTypes
  .filter(type => builds.includes(type))
  .map(type => createConfig(configs[type]));
