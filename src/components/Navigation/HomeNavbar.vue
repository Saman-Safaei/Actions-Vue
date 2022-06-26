<template>
  <div class="flex flex-row justify-start items-stretch h-16 bg-white backdrop-blur-sm z-[8] px-3">
    <div class="py-4 flex flex-row items-center gap-2">
      <router-link :to="{ name: 'home' }" class="h-full"><img class="h-full" src="../../assets/logo.svg" alt="logo"></router-link>
    </div>
    <div class="flex-grow"></div>
    <nav class="hidden md:flex flex-row items-center">
      <ul class="flex flex-row items-center h-full gap-3">
        <li><a class="text-teal-700" href="#preview">Preview</a></li>
        <li><a class="text-teal-700" href="#features">Features</a></li>
        <li><a class="text-teal-700" href="#about">About Us</a></li>
      </ul>
    </nav>
    <div class="hidden md:block md:flex-grow"></div>
    <div class="hidden md:flex flex-row gap-2 items-center">
      <button class="py-1.5 px-2.5 rounded-md transition"
        @click="userStore.logOut()" v-if="userStore.loggingIn">Log out</button>
      <router-link class="bg-teal-600 hover:bg-teal-500 text-white py-1.5 px-2 rounded-md transition"
        :to="{ name: 'auth' }">{{ signinButtonName }}</router-link>
    </div>

    <div class="md:hidden flex flex-row items-center">
      <button @click="mainStore.toggleHomeDrawer()"><DotsVerticalIcon class="w-7 h-7 black"/></button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { DotsVerticalIcon } from "@heroicons/vue/outline";
import { useUserStore } from "../../stores/users";
import { useMainStore } from "../../stores/main";

const userStore = useUserStore();
const mainStore = useMainStore();

const signinButtonName = computed(() => (userStore.loggingIn) ? "Dashboard" : "Log in");
</script>
