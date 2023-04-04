import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Logger for general server logs
export const Logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss TZ',
    }),
    format.json(),
    format.errors({ stack: true }),
  ),
  transports: [
    new transports.Console({
      format: format.printf((log) => log.message),
    }),
    new DailyRotateFile({
      level: 'info',
      dirname: './logs',
      filename: 'info_log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '7d',
    }),
    new DailyRotateFile({
      level: 'error',
      dirname: './logs',
      filename: 'error_log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '7d',
    }),
  ],
});

// Logger for HTTP requests
export const RequestLogger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss TZ',
    }),
    format.json(),
    format.errors({ stack: true }),
  ),
  transports: [
    new transports.Console(
      {
        level: 'http',
        format: format.printf((log) => (`${log.method} - ${log.status} - ${log.url} - ${log.response_time}ms`)),
      },
    ),
    new DailyRotateFile({
      level: 'http',
      dirname: './logs',
      filename: 'http_log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '7d',
    }),
  ],
});
