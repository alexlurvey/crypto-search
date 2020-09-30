import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

export default (async () => ({
  input: 'src/index.js',
  output: {
    dir: 'public',
    format: 'es',
    sourcemap: true,
  },
  preserveEntrySignatures: false,
  plugins: [
    resolve(),
    babel({ babelHelpers: 'runtime', skipPreflightCheck: true }),
    postcss({
      plugins: [ require('autoprefixer') ]
    }),
    image(),
    commonjs({ include: 'node_modules/**' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( env )
    }),
    isProduction && (await import('rollup-plugin-terser')).terser()
  ],
}))();
