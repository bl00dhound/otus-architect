import INotification from '../interfaces/INotification';
import db from '../providers/db';

const LIMIT = 10;

export default class NotificationDAO {
  static async getNotificationByUserId(userId: string): Promise<INotification[]> {
    return db('user_notifications')
      .select()
      .where('user_id', userId)
      .orderBy('created_at', 'desc')
      .limit(LIMIT);
  }
}
