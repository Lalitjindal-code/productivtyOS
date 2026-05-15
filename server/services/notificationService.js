const User = require('../models/User');

/**
 * Service to handle push notifications via Firebase Cloud Messaging (FCM).
 * Note: Actual Firebase Admin SDK setup would require a serviceAccountKey.json.
 */
class NotificationService {
  constructor() {
    this.enabled = false;
    // In a real app, you would initialize admin SDK here
    // admin.initializeApp({ ... });
  }

  /**
   * Send a push notification to a specific user.
   */
  async sendToUser(userId, payload) {
    try {
      const user = await User.findOne({ userId });
      if (!user || !user.fcmToken) {
        console.log(`[NotificationService] User ${userId} has no FCM token. Skipping.`);
        return;
      }

      console.log(`[NotificationService] Sending to ${userId}:`, payload);
      
      // Real implementation:
      // await admin.messaging().send({
      //   token: user.fcmToken,
      //   notification: {
      //     title: payload.title,
      //     body: payload.body,
      //   },
      //   data: payload.data || {},
      // });

    } catch (error) {
      console.error('[NotificationService] Error sending notification:', error.message);
    }
  }

  /**
   * Send a focus mode lock signal to the mobile app.
   */
  async sendFocusLock(userId, taskTitle) {
    return this.sendToUser(userId, {
      title: 'Focus Mode Active! 🔥',
      body: `Working on: ${taskTitle}`,
      data: {
        type: 'FOCUS_LOCK',
        taskTitle: taskTitle,
        lockedAt: new Date().toISOString()
      }
    });
  }

  /**
   * Notify about a level up or achievement.
   */
  async sendAchievementAlert(userId, achievementTitle) {
    return this.sendToUser(userId, {
      title: 'New Achievement! 🏆',
      body: `You unlocked: ${achievementTitle}`,
      data: { type: 'ACHIEVEMENT' }
    });
  }
}

module.exports = new NotificationService();
