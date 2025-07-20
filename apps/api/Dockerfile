FROM node:20-alpine

WORKDIR /app

# Kopíruj package.json súbory
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
COPY libs/database/package.json ./libs/database/

# Inštaluj závislosti
RUN yarn install --frozen-lockfile

# Kopíruj zdrojový kód
COPY . .

# Build aplikácie
RUN yarn nx build api

# Expose port
EXPOSE 3333

# Spusti aplikáciu
CMD ["node", "dist/apps/api/main.js"] 