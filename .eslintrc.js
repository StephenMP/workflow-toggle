module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'sort-destructure-keys', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: 'actions/**/dist',
  rules: {
    curly: 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'off',
    'prettier/prettier': 1, // 1 Means warning, 2 Means error
    'sort-destructure-keys/sort-destructure-keys': 2,
    semi: ['error', 'always'],
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: ['src/**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      },
    },
    {
      files: ['*.ts'],
      excludedFiles: ['*.spec.ts', '*.d.ts'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
      },
    },
  ],
};
