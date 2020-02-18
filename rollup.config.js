import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    dir: 'public',
    format: 'es',
    sourcemap: true,
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
        'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
        'node_modules/react/index.js': [ 'useMemo', 'useEffect', 'useState', 'Fragment', 'useContext', 'useReducer', 'useLayoutEffect', 'useRef', 'useCallback' ],
        'node_modules/react-dom/index.js': [ 'unstable_batchedUpdates' ],
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV || 'development' )
    }),
  ],
};
