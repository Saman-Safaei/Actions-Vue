<template>
  <Transition name="drawer" duration="1000">
    <div class="fixed inset-0 z-20 bg-white pb-16 overflow-y-auto overflow-x-hidden" v-if="mainStore.showHomeDrawer">
      <div class="drawer-head h-16 px-3 py-4 mb-4 flex flex-row items-center justify-start gap-3">
        <router-link :to="{ name: 'home' }" class="h-full"><img class="h-full" src="../../assets/logo.svg" alt="logo">
        </router-link>
        <p class="text-transparent bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-lg">Actions Vue</p>
        <span class="flex-grow"></span>
        <button @click="mainStore.toggleHomeDrawer()">
          <XIcon class="h-6 w-6 text-gray-400" />
        </button>
      </div>

      <div class="drawer-section px-4 mb-8">
        <h3 class="text-2xl mb-2 font-bold">Home</h3>
        <div class="px-2">
          <router-link class="block w-full mb-1 text-teal-800" to="#">Preview</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">Features</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">About us</router-link>
        </div>
      </div>

      <div class="drawer-section px-4 mb-8">
        <h3 class="text-2xl mb-2 font-bold">Lorem Ipsum</h3>
        <div class="px-2">
          <router-link class="block w-full mb-1 text-teal-800" to="#">Lorem</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">Ipsum</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">Test Link</router-link>
        </div>
      </div>

      <div class="drawer-section px-4 mb-8">
        <h3 class="text-2xl mb-2 font-bold">Docs</h3>
        <div class="px-2">
          <router-link class="block w-full mb-1 text-teal-800" to="#">Why Actions Vue</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">Installation</router-link>
          <router-link class="block w-full mb-1 text-teal-800" to="#">Getting Started</router-link>
        </div>
      </div>

      <div class="drawer-footer fixed bottom-0 right-0 left-0 h-16 bg-slate-200 flex flex-row items-center justify-end gap-3 px-4">
        <router-link :to="{ name: 'auth' }">Sign up</router-link>
        <router-link class="bg-teal-600 hover:bg-teal-500 text-white px-2.5 py-1.5 rounded-md transition"
          :to="{ name: 'auth' }">Login</router-link>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/outline';
import { useMainStore } from '../../stores/main';

const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.5s;
}

// -------

.drawer-enter-from .drawer-head ,
.drawer-leave-to .drawer-head {
  opacity: 0;
  transform: translateY(-100%);
}

.drawer-enter-active .drawer-head ,
.drawer-leave-active .drawer-head {
  transition: all 0.8s;
}

// -------


.drawer-enter-from .drawer-footer ,
.drawer-leave-to .drawer-footer {
  opacity: 0;
  transform: translateY(100%);
}

.drawer-enter-active .drawer-footer ,
.drawer-leave-active .drawer-footer {
  transition: all 0.8s;
}

// -------

.drawer-enter-from .drawer-section ,
.drawer-leave-to .drawer-section {
  opacity: 0;
  transform: translateX(-100%);
}

.drawer-enter-active .drawer-section ,
.drawer-leave-active .drawer-section {
  transition: all 0.8s;
}
</style>
