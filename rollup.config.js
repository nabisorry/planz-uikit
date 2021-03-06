import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';
import alias from 'rollup-plugin-alias';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

process.env.BABEL_ENV = 'production';

export default {
  input: './src/index.ts',
  plugins: [
    alias({
      resolve: ['.svg', '.png', ...extensions],
      entries: {
        '@': 'resources',
      },
    }),
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    commonjs({
      include: 'node_modules/**',
    }),
    svgr(),
    image(),
    url(),
    peerDepsExternal(),
  ],
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};
