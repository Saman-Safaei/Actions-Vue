<template>
  <NotificationLayout />
  <main class="container mx-auto px-5">
    <RouterView />
  </main>
</template>

<script setup>
import NotificationLayout from './components/Notification/NotificationLayout.vue';
import { useI18n } from "vue-i18n";
</script>
