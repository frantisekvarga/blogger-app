# Linting

This documents describes how to approach linting

## Eslint

Base eslint config is in (`/.eslintrc.js`)[../.eslintrc.js]. In each app or lib or tool this base config is extended (e.g `extends: ['../../.eslintrc.js']`)

### Format & lint whole project

- `yarn lint:all:fix`

### Type check
- `yarn ts:check:all`
