<template>
  <div
    class="flex flex-row items-center gap-1.5 p-3 shadow-md rounded-md bg-white">
    <router-link :to="{ name: 'home' }">
      <img class="w-8 h-8" src="@/assets/logo.svg" alt="brand" />
    </router-link>
    <button class="border-solid border-b-4 border-teal-600" @click="changeLang">
      {{ locale.toUpperCase() }}
    </button>

    <span class="grow"></span>
    <div :dir="direction" class="flex flex-row h-full items-center gap-1.5">
      <OutlinedButton @click="mainStore.toggleModal">
        {{ t('buttons.new') }}
      </OutlinedButton>
      <OutlinedButton @click="logoutAndPush">
        {{ t('buttons.logout') }}
      </OutlinedButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/users';
import { useMainStore } from '../../stores/main';
import OutlinedButton from '../Buttons/OutlinedButton.vue';

const mainStore = useMainStore();
const userStore = useUserStore();
const router = useRouter();

const { t, locale } = useI18n({ useScope: 'global' });

function logoutAndPush() {
  userStore.logOut();
  router.push({ name: 'auth' });
}
function changeLang() {
  locale.value === 'en' ? (locale.value = 'fa') : (locale.value = 'en');
}

const direction = computed(() => {
  return locale.value === 'fa' ? 'rtl' : 'ltr';
});
</script>
