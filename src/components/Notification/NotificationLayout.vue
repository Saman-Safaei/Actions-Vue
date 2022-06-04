<template>
  <div class="fixed top-12 right-0 max-w-md z-10">
    <transition-group name="notifs">
      <Notification v-for="notif in store.getAllNotifications" :key="notif.id" :n-id="notif.id">
        {{ notif.message }}
      </Notification>
    </transition-group>
  </div>
</template>

<script setup>
import Notification from './Notification.vue';
import { useNotifStore } from '../../stores/notification';

const store = useNotifStore();
</script>

<style lang="scss" scoped>
.notifs-enter-from,
.notifs-leave-to {
  transform: translateX(100%);
}
.notifs-enter-active,
.notifs-leave-active {
  transition: all 200ms;
}
</style>
