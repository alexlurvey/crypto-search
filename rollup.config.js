import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'umd',
    sourcemap: true,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    resolve(),
    babel({ runtimeHelpers: true }),
    postcss({
      plugins: [ require('autoprefixer') ]
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    }),
  ],
  external: [ 'react', 'react-dom' ]
};
