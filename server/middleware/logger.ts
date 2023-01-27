// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const Logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss TZ',
    }),
    format.json(),
    format.errors({ stack: true }),
  ),  
  transports: [
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
