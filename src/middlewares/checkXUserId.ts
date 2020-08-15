import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const { userId } = params;
  const xUserId = req.get('X-UserId');

  if (Number(userId) === Number(xUserId)) {
    return next();
  }

  return res.status(403).send('Forbidden');
};
