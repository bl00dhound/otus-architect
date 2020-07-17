import dotenv from 'dotenv';
import express from 'express';
import httpShutdown from 'http-shutdown';
import httpLogger from 'express-pino-logger';
import bodyParser from 'body-parser';

import http from 'http';

import config from './config';
import logger from './providers/logger';
import v1 from './v1';

dotenv.config();

const app = express();
const server = httpShutdown(http.createServer(app));

const shutdown = () => {
  server.shutdown(() => logger.info('server is stopped'));
  process.exit(0);
};

const startCb = () => {
  logger.info('server is started', {
    pid: process.pid,
    port: config.port,
  });
};

process.on('uncaughtException', error => {
  logger.fatal({
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

app.use(httpLogger({ logger }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1', v1);

app.use('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found' })
);

server.listen(config.port, '0.0.0.0', startCb);

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
