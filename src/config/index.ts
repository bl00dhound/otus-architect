const config = {
  logLevel: process.env.LOG_LEVEL,
  port: Number(process.env.PORT || 8000),
  rabbitMqHost: process.env.RABBITMQ_HOST || 'localhost',
  rabbitMqPort: Number(process.env.RABBITMQ_PORT || 5672),
};

export default config;
