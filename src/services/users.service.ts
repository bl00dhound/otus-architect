import User from '../dao/users.dao';
import UserSchema from '../schemas/users.schema';

import IUser from '../interfaces/IUser';

const service = {
  getById: (userId: string) => {
    if (!userId) throw Error('userId does not exist');

    return User.getById(userId);
  },
  create: (data: Omit<IUser, 'id'>) => {
    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    return User.create(data);
  },
  delete: (userId: string) => {
    if (!userId) throw Error('userId does not exist');

    return User.delete(userId);
  },
  update: (userId: string, data: IUser) => {
    if (!userId) throw Error('userId does not exist');

    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    const { id, createdAt, ...user } = data;
    user.updatedAt = new Date();

    return User.update(userId, user);
  },
};

export default service;
