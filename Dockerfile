FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY src/ ./src/
# Déploie les commandes puis démarre le bot
CMD ["sh", "-c", "npm run deploy && npm start"]
