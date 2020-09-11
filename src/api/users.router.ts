import express from 'express';
import proxy from 'express-http-proxy';

import Service from '../services/users.service';
import OrderService from '../services/orders.service';
import checkXUserId from '../middlewares/checkXUserId';
import Config from '../config';

const router = express.Router();

router.get(
  '/:userId',
  checkXUserId,
  (req, res) => Service.getById(req?.params?.userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

router.post(
  '/',
  (_req, res) => res.status(404).send('Not found'),
  (req, res) => Service.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

router.delete(
  '/:userId',
  checkXUserId,
  (req, res) => Service.delete(req?.params?.userId)
    .then((data) => res.status(204).json(data))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

router.put(
  '/:userId',
  checkXUserId,
  (req, res) => Service.update(req?.params?.userId, req?.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

router.get(
  '/account/:userId',
  checkXUserId,
  proxy(`${Config.billingHost}:${Config.billingPort}`),
);

router.post(
  '/account/:userId',
  checkXUserId,
  (req, res) => Service.replenishBalance(req.params.userId, req?.body)
    .then((isSuccess) => res.status(200).json({ ok: isSuccess }))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

router.post(
  '/order/:userId',
  checkXUserId,
  (req, res) => OrderService.createOrder(req.params.userId, req?.body)
    .then((order) => res.status(200).json({ orderId: order.id, status: order.status }))
    .catch((err) => res.status(400).send(err?.message || 'Error')),
);

export default router;
