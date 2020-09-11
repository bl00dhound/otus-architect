import User from '../dao/users.dao';
import { UserSchema, ReplenishSchema } from '../schemas';
import { Events } from '../constants';

import bus from '../providers/bus';

import IUser from '../interfaces/IUser';
import IReplenishData from '../interfaces/IReplenishData';

export default class UserService {
  static async getById(userId: string) {
    if (!userId) throw Error('userId does not exist');

    return User.getById(userId);
  }

  static async create(data: Omit<IUser, 'id'>) {
    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    return User.create(data);
  }

  static async delete(userId: string) {
    if (!userId) throw Error('userId does not exist');

    return User.delete(userId);
  }

  static async update(userId: string, data: IUser) {
    if (!userId) throw Error('userId does not exist');

    const isValid = UserSchema(data);

    if (!isValid || Object.keys(data).length < 4) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    const { id, createdAt, ...user } = data;
    user.updatedAt = new Date();

    return User.update(userId, user);
  }

  static async replenishBalance(userId: string, data: IReplenishData): Promise<boolean> {
    const replenishData = { ...data, user_id: Number(userId) };

    const isValid = ReplenishSchema(replenishData);

    if (!isValid || Object.keys(replenishData).length < 2) throw Error(UserSchema?.errors?.[0]?.message || 'validation error');

    return bus.publish(Events.REPLENISH_BALANCE, replenishData);
  }
}
