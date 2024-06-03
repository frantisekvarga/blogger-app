# Database package

- contains entities, migrations, seeders
- setup env variables according to .sample.env

### Create database

- `nx run database:create-db`

### Drop database

- `nx run database:drop-db`

### Entities

- when adding entity, don't forget to add it to entities/index.ts so it can be easily imported anywhere in the project

### Create migration

- `nx run database:migration:create --name=NAME_OF_MIGRATION`
- empty migration will be created in src/lib/migrations
  - add the code of the migration

### Run migrations

- `nx run database:migrations:run`

### Revert last migration

- `nx run database:migration:revert`

### Create seed

- `nx run database:seed:create --path=src/lib/seeds/SeederName`
- creates empty seeding script
  - add the code of the seed

### Run seeds

- `nx run database:seed:run`
- is not supported on mac/linux due to issues in the package 'typeorm-extension' + 'ts-node'
