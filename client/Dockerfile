FROM node:18-alpine

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${CLIENT_PORT}

CMD ["npm", "start"]