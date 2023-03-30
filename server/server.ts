import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import io from './sockets';
import app from './app';
import { Logger } from './middleware/logger';

dotenv.config({ path: './../.env' });
const DB = process.env.DB as string;

const connectionOptions = {
  dbName: process.env.NODE_ENV,
};
mongoose.set('strictQuery', false);
mongoose.connect(DB, connectionOptions).then(() => {
  Logger.info('Server-DB Connection Successful!');
});

const server = http.createServer(app);

const port = process.env.DEV_SERVER_PORT || 4000;

io.attach(server, {
  cors: {
    origin: '*',
  },
});

server.listen(port, () => {
  Logger.info(`App listening on port ${port}`);
});

export default server;
