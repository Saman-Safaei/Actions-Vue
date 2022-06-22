<template>
  <NotificationLayout />
  <RouterView />
</template>

<script setup>
import NotificationLayout from './components/Notification/NotificationLayout.vue';
import { useI18n } from "vue-i18n";
</script>
