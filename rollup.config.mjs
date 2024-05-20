import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import less from 'rollup-plugin-less';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    // {
    //   file: 'dist/index.umd.js',
    //   format: 'umd',
    //   name: 'MyComp',
    //   globals: {
    //     react: 'React',
    //     'react/jsx-runtime': 'jsxRuntime',
    //   },
    // },
  ],
  plugins: [
    resolve(),
    external(),
    commonjs(),
    less({
      output: 'dist/index.css',
      option: {
        compress: true,
      },
    }),
    terser(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
});
