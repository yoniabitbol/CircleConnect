import morgan, { StreamOptions } from 'morgan';
import { Logger, RequestLogger } from './logger';

// Morgan stream for logging HTTP requests
const stream: StreamOptions = {
  write: (message) => {
    const data = JSON.parse(message);
    Logger.http('request', data);
    RequestLogger.http('request', data);
  },
};

// Morgan middleware for logging HTTP requests
const Morgan = morgan(
  (tokens, req, res) => JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number.parseFloat(tokens.status(req, res) as string),
    content_length: tokens.res(req, res, 'content-length'),
    response_time: Number.parseFloat(tokens['response-time'](req, res) as string),
  }),
  { stream },
);

export default Morgan;
