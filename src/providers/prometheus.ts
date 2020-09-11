import Prometheus from 'prom-client';
import { Request, Response } from 'express';

export const metricsInterval = Prometheus.collectDefaultMetrics();

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'request_latency',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

const httpRequestDurationPercentiles = new Prometheus.Summary({
  name: 'request_latency_summary',
  help: 'Percentage of duration of HTTP requests',
  labelNames: ['method'],
  percentiles: [0.5, 0.95, 0.99, 1],
});

const httpRequestCounter = new Prometheus.Counter({
  name: 'request_counter',
  help: 'Counter of all request',
  labelNames: ['method', 'route', 'code'],
});

export const requestMetricObserve = (req: Request, res: Response) => {
  const responseTime = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels(req.method, req?.route?.path, res.statusCode.toString())
    .observe(responseTime);

  httpRequestDurationPercentiles.labels(req.method).observe(responseTime);

  httpRequestCounter
    .labels(req.method, req?.route?.path, res.statusCode.toString())
    .inc();
};

export default Prometheus;
