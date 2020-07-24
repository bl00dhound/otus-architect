FROM node:10-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY forever.json ./
COPY logs logs/
COPY src src/
COPY migrations migrations/

RUN npm run build

EXPOSE 8000
ENTRYPOINT ["npm", "start"]
