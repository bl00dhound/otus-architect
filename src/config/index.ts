const config = {
  logLevel: process.env.LOG_LEVEL,
  port: Number(process.env.PORT || 8000),
  billingHost: process.env.BILLING_HOST || 'localhost',
  billingPort: Number(process.env.BILLING_PORT || 8002),
  rabbitMqURI: `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST || 'localhost'}:${process.env.RABBITMQ_PORT || 5672}`,
};

export default config;
