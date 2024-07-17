import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import eslintComments from 'eslint-plugin-eslint-comments';
import _import from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:eslint-comments/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended'
    )
  ).map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,js,jsx}'],
  })),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: fixupPluginRules(react),
      'eslint-comments': fixupPluginRules(eslintComments),
      import: fixupPluginRules(_import),
      'jsx-a11y': fixupPluginRules(jsxA11Y),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 2021,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/extensions': ['.tsx', '.ts', '.js', '.jsx', '.json'],

      'import/resolver': {
        typescript: {
          project: ['./jsconfig.json', './tsconfig.json'],
        },
      },
    },

    rules: {
      'prettier/prettier': ['warn'],
      'no-shadow': 'error',
      'no-unused-vars': 'warn',
      'require-yield': 'warn',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',

      'eslint-comments/disable-enable-pair': [
        'warn',
        {
          allowWholeFile: true,
        },
      ],
    },
  },
  ...compat
    .extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
    })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'script',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: ['./tsconfig.json'],
      },
    },

    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
