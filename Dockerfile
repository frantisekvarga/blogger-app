FROM node:20-alpine

WORKDIR /app



# Kopíruj package.json súbory
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY libs/database/package.json ./libs/database/
COPY nx.json ./
COPY tsconfig.base.json ./

# Inštaluj závislosti pomocou yarn
RUN yarn install --network-timeout 100000

# Kopíruj zdrojový kód
COPY . .

# Build aplikácie
RUN yarn nx build api

# Expose port
EXPOSE 10000

# Spusti migrácie a potom aplikáciu
CMD yarn nx run database:run-migrations && node dist/apps/api/main.js 