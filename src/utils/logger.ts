import { format, createLogger, transports } from "winston";
const { combine, timestamp, colorize, errors } = format;

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export default createLogger({
  format: combine(
    colorize({ level: true }),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new transports.Console()],
});
