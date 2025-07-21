FROM node:20-alpine

WORKDIR /app

# Inštaluj yarn
RUN npm install -g yarn

# Kopíruj package.json súbory
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY libs/database/package.json ./libs/database/

# Inštaluj závislosti pomocou yarn
RUN yarn install --network-timeout 100000

# Kopíruj zdrojový kód
COPY . .

# Build aplikácie
RUN yarn nx build api

# Expose port
EXPOSE 10000

# Spusti aplikáciu
CMD ["node", "dist/apps/api/main.js"] 