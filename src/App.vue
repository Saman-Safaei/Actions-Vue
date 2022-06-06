<template>
  <NotificationLayout />
  <main class="max-w-5xl mx-auto px-5 py-1">
    <RouterView />
  </main>
</template>

<script setup>
import NotificationLayout from './components/Notification/NotificationLayout.vue';
import { useI18n } from "vue-i18n";
</script>
