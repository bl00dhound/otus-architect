import express from 'express';

import Prometheus from '../providers/prometheus';

const router = express.Router();

router.get('/', (_req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

export default router;
