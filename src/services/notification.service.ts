import INotification from '../interfaces/INotification';
import NotificationDAO from '../dao/notification.dao';

export default class NotificationService {
  static async getNotificationsByUserId(userId: string): Promise<INotification[]> {
    return NotificationDAO.getNotificationByUserId(userId);
  }
}
