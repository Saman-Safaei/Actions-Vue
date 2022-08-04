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
      <ul class="flex flex-row items-center h-full gap-4">
        <li>
          <a class="relative text-teal-700 hover:text-teal-600 transition duration-300 before:content-[''] before:rounded-full before:absolute before:top-[130%] before:right-0 before:h-0.5 before:w-full before:bg-teal-500 before:origin-center before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 before:delay-75" href="#preview">{{
            t('buttons.preview')
          }}</a>
        </li>
        <li>
          <a class="relative text-teal-700 hover:text-teal-600 transition duration-300 before:content-[''] before:rounded-full before:absolute before:top-[130%] before:right-0 before:h-0.5 before:w-full before:bg-teal-500 before:origin-center before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 before:delay-75" href="#features">{{
            t('buttons.features')
          }}</a>
        </li>
        <li>
          <a class="relative text-teal-700 hover:text-teal-600 transition duration-300 before:content-[''] before:rounded-full before:absolute before:top-[130%] before:right-0 before:h-0.5 before:w-full before:bg-teal-500 before:origin-center before:scale-x-0 hover:before:scale-x-100 before:transition-all before:duration-500 before:delay-75" href="#about">
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
        <MenuAlt3Icon class="w-7 h-7 text-gray-600" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { MenuAlt3Icon } from '@heroicons/vue/outline';
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
