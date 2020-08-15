import express from 'express';

import Service from '../services/users.service';
import checkXUserId from '../middlewares/checkXUserId';

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

export default router;
