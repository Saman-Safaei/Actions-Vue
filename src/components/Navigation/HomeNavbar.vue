<template>
  <div
    class="flex flex-row justify-start items-stretch h-16 bg-white backdrop-blur-sm z-[8] px-3"
    v-bind="$attrs">
    <div class="flex flex-row items-center py-4 gap-2 h-full">
      <router-link :to="{ name: 'home' }" class="h-full"
        ><img class="h-full" src="../../assets/logo.svg" alt="logo" />
      </router-link>
      <button
        class="border-solid border-b-4 border-teal-700"
        @click="switchLang">
        {{ locale.toUpperCase() }}
      </button>
    </div>
    <div class="flex-grow"></div>
    <nav :dir="direction" class="hidden md:flex flex-row items-stretch">
      <ul class="flex flex-row items-center h-full gap-3">
        <li>
          <a class="text-teal-700" href="#preview">{{
            t('buttons.preview')
          }}</a>
        </li>
        <li>
          <a class="text-teal-700" href="#features">{{
            t('buttons.features')
          }}</a>
        </li>
        <li>
          <a class="text-teal-700" href="#about">
            {{ t('buttons.about') }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="hidden md:block md:flex-grow"></div>
    <div class="hidden md:flex flex-row gap-2 items-center">
      <button
        class="py-1.5 px-2.5 rounded-md transition duration-300"
        @click="userStore.logOut()"
        v-if="userStore.loggingIn">
        {{ t('buttons.logout') }}
      </button>
      <router-link
        class="bg-teal-600 hover:bg-teal-500 !text-white py-1.5 px-2 rounded-md transition"
        :to="{ name: 'auth' }"
        >{{ signinButtonName }}</router-link
      >
    </div>

    <div class="md:hidden flex flex-row items-center">
      <button @click="mainStore.toggleHomeDrawer()">
        <DotsVerticalIcon class="w-7 h-7 black" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { DotsVerticalIcon } from '@heroicons/vue/outline';
import { useUserStore } from '../../stores/users';
import { useMainStore } from '../../stores/main';
import { useLocale } from '../../composables/locale';

const userStore = useUserStore();
const mainStore = useMainStore();

const { locale, switchLang, t, direction } = useLocale();

const signinButtonName = computed(() =>
  userStore.loggingIn ? t('buttons.dashboard') : t('buttons.login')
);
</script>
