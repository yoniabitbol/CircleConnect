FROM node:18-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "dev"]