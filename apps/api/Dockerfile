FROM node:20-alpine

WORKDIR /app

# Kopíruj package.json súbory
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY libs/database/package.json ./libs/database/

# Inštaluj závislosti pomocou npm
RUN npm install

# Kopíruj zdrojový kód
COPY . .

# Build aplikácie
RUN npm run build

# Expose port
EXPOSE 10000

# Spusti aplikáciu
CMD ["node", "dist/apps/api/main.js"] 