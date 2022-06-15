<template>
  <div class="flex flex-col min-h-[90vh] md:min-h-[98vh] items-center justify-center">
    <Transition name="home-slide" mode="out-in">
      <component :is="component" @switch="swithComponent" />
    </Transition>
    <div :dir="direction" class="flex flex-row justify-between w-full sm:w-3/5 md:w-2/5 py-2 px-3">
      <router-link :to="{ name: 'about' }" class="text-white">{{ t("texts.about") }}</router-link>
      <span class="flex flex-row gap-2">
        <button @click="switchLang" class="text-white">{{ locale }}</button>
        <GlobeIcon class="text-gray-100 h-5 w-5" />
      </span>
    </div>
  </div>
  <ActionModal :center="true" v-if="showMessage"
    text="Make sure of your enabled VPN<br>مطمئن شوید به فیلتر شکن متصل اید" @close="closeMessage" />
  <div class="fixed inset-0 bg-[url('../assets/imgs/sky.jpg')] -z-20"></div>
</template>

<script setup>
import SignUp from '../components/Auth/SignUp.vue';
import Login from '../components/Auth/LoginForm.vue';
import ActionModal from '../components/Actions/ActionModal.vue';

import { ref, computed } from 'vue';
import { GlobeIcon } from '@heroicons/vue/outline';
import { useI18n } from 'vue-i18n';


const showLogin = ref(true);
const showMessage = ref(true);

const { t, locale } = useI18n();
const direction = computed(() => locale.value === 'fa' ? "rtl" : "ltr");

function switchLang() {
  locale.value === 'fa' ? locale.value = 'en' : locale.value = 'fa';
}

function swithComponent() {
  showLogin.value = !showLogin.value;
}

function closeMessage() {
  showMessage.value = false;
}

const component = computed(() => {
  if (showLogin.value) return Login;
  else return SignUp;
})
</script>

<style lang="scss">
.home-slide-enter-from {
  opacity: 0;
  transform: translateX(-100vw);
}

.home-slide-leave-to {
  opacity: 0;
  transform: translateX(100vw);
}

.home-slide-enter-active,
.home-slide-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>
