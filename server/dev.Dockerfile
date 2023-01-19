FROM node:18-alpine

ARG DEV_SERVER_PORT

WORKDIR /app/server

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE ${DEV_SERVER_PORT}

CMD ["npm", "run", "start:dev"]