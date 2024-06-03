# Linting

This documents describes how to approach linting

## Eslint

Base eslint config is in (`/.eslintrc.js`)[../.eslintrc.js]. In each app or lib or tool this base config is extended (e.g `extends: ['../../.eslintrc.js']`)

## Lint-staged

Lint and TS build are called on each commit on developer machine before each commit (pre-commit hook). This lint has only informative functionality, it does not fix anything, it is up to developer.

## Remote linting

On each opened PR there is called lint for entire project (this command uses NX remote cache), and also TS build

### Format whole project

- `nx format:write`
