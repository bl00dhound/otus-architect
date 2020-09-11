import { Events } from '../constants';

export default interface INotification {
  id: number;
  created_at: Date;
  event: Events;
  user_id: number;
  message: string;
}
