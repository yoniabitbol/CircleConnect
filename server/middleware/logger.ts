// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
  ),
});

export default logger;
