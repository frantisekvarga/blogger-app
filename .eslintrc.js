module.exports = {
  root: true,
  plugins: [
    '@nx',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'eslint-plugin-prettier',
    'jest',
  ],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['**/__generated__/**'],
  overrides: [
    {
      plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: 'app',
                onlyDependOnLibsWithTags: ['app', 'lib'],
              },
              {
                sourceTag: 'lib',
                onlyDependOnLibsWithTags: ['lib'],
              },
            ],
          },
        ],
      },
    },
  ],
};
