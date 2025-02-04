// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import aliasPlugin from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import dts from 'rollup-plugin-dts';

const isProduction = process.env.NODE_ENV === 'production';
const plugins = isProduction ? [uglify()] : [];
const commonAliases = [];
const config = {
  input: './src/index',
  output: './package/index',
};

export default [
  {
    input: `${config.input}.ts`, // 入口文件
    output: [
      {
        file: `${config.output}.js`, // 打包后的存放文件
        format: 'cjs', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      },
      // {
      //   file: `${config.output}.es.js`, // 打包后的存放文件
      //   format: 'es', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
      //   name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
      //   sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      // },
      // {
      //   file: `${config.output}.umd.js`, // 打包后的存放文件
      //   format: 'umd', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
      //   name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
      //   sourcemap: true, // 生成 bundle.map.js 文件，方便调试
      // },
    ],
    watch: {
      include: 'src/**',
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: '/@types',
        emitDeclarationOnly: true,
      }),
      json(),
      commonjs(),
      aliasPlugin({ entries: commonAliases }),
      terser({
        ecma: 2021,
        compress: {
          // drop_console: true,
          drop_debugger: true,
          reduce_vars: true,
          sequences: true,
          booleans: true,
          unused: true,
          dead_code: true,
          conditionals: true,
          evaluate: true,
        },
        output: {
          comments: false,
        },
      }),
      ...plugins,
    ],
  },
  {
    input: `${config.input}.ts`, // 入口文件
    output: [
      {
        file: `${config.output}.d.ts`, // 打包后的存放文件
        format: 'es', // 输出格式  "amd", "cjs", "system", "es", "iife", "umd".
        name: 'bundleName', // 如果 iife, umd 需要指定一个全局变量
        sourcemap: false, // 生成 bundle.map.js 文件，方便调试
      },
    ],
    watch: {
      include: 'src/**',
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: '/@types',
        emitDeclarationOnly: true,
      }),
      aliasPlugin({ entries: commonAliases }),
      dts(),
    ],
  },
];
