FROM node:18-alpine

ARG DEV_CLIENT_PORT

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${DEV_CLIENT_PORT}

CMD ["npm", "run", "start"]
