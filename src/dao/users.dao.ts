import db from '../providers/db';
import IUser from '../interfaces/IUser';
import { toSnakeCase } from '../utils';

const RETURNING = [
  'id',
  'first_name as firstName',
  'last_name as lastName',
  'email',
  'phone',
  'created_at as createdAt',
  'updated_at as updatedAt',
];

const dao = {
  getById: (id: string): Promise<IUser> => db('users')
    .first(
      'id',
      'first_name as firstName',
      'last_name as lastName',
      'email',
      'phone',
      'created_at as createdAt',
      'updated_at as updatedAt',
    )
    .where('id', id),
  create: (user: Omit<IUser, 'id'>): Promise<IUser> => db('users')
    .insert(toSnakeCase(user))
    .returning(RETURNING)
    .then((users) => users[0]),
  delete: (userId: string): Promise<IUser> => db('users')
    .delete()
    .where('id', userId)
    .returning(RETURNING)
    .then((users) => users[0]),
  update: (userId: string, data: Omit<IUser, 'id'>): Promise<IUser> => db('users')
    .update(toSnakeCase(data))
    .where('id', userId)
    .returning(RETURNING)
    .then((users) => users[0]),
};

export default dao;
