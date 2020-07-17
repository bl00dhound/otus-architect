import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json({ status: 'OK' });
});

export default router;
