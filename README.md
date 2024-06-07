### Template of simple Full Stack App
- the project contains a simple setup of Express.js app and React.js app to be implemented into a multi-user 
  blogging engine

## Structure

- `docs` - generic documentation
- `libs` - shared libraries
- `apps` - different applications
  - [`api`](./apps/api) - API layer
  - [`app`](./apps/app) - App frontend

## Requirements

- Bash (or WSL)
- Node 20
- Yarn 1
- Nx ^19.1.1

## Quick start
- setup correct node version
  - install node manager (nvm)
    - [windows](https://github.com/coreybutler/nvm-windows)
    - [mac](https://formulae.brew.sh/formula/nvm#default)
  - nvm install 20
  - nvm use 20
- yarn install
- nx serve api (port 3333)
- nx serve app (port 4200)

## Database
- use postgres
- if not installed, you can use docker-compose to run local database
- `docker-compose -f ./db/docker-compose.yml up`

## Important links

- Repo: https://github.com/instea/junior-challenge-project-template

| Feature      | Description                        |                                      File |
| :----------- | ---------------------------------- | ----------------------------------------: |
| Nx workspace | How to use Nx                      | [nx-workspace.md](./docs/nx-workspace.md) |
| Linting      | How is linting setup               |           [linting.md](./docs/linting.md) |
| Database lib | How to use database in the project |  [database.md](./libs/database/README.md) |
