import { defineStore } from "pinia";

export const useNotifStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    notifNumber: 0
  }),
  actions: {
    pushNotification(notif) {
      this.notifications.push({ id: this.notifNumber, message: notif });
      this.timedRemoveNotif(this.notifNumber);
      this.notifNumber++;
    },
    timedRemoveNotif(id) {
      setTimeout(() => {
        this.notifications = this.notifications.filter((value) => value.id !== id);
      }, 4000);
    },
    removeNotif(id) {
      this.notifications = this.notifications.filter((value) => value.id !== id);
    }
  },
  getters: {
    getAllNotifications() {
      return this.notifications;
    }
  }
});
