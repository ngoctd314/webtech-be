module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'import/order': 'off',
    'dot-notation': 'off',
    'func-names': 'off',
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'prefer-arrow-callback': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.ts'] },
    ],
    'operator-linebreak': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,

        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
};
