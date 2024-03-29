<template>
  <header>
    <HomeNavbar :class="navbarStyles" />
    <div class="h-16" v-show="navbarFixed"></div>
    <HomeDrawer />
    <div class="bg-white p-8">
      <div
        :dir="direction"
        class="flex flex-col md:flex-row items-stretch gap-x-16 gap-y-8 max-w-6xl mx-auto">
        <div
          class="flex flex-col order-2 md:order-1 gap-3 justify-center items-center md:items-start flex-grow">
          <h1
            class="text-4xl md:text-5xl font-bold text-transparent text-center md:text-start bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text">
            Actions Vue
          </h1>
          <p
            class="text-lg text-center text-gray-600 md:text-justify leading-8">
            {{ t('texts.headerText') }}
          </p>
          <router-link
            :to="{ name: 'dashboard' }"
            class="mt-4 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2.5 rounded-full transition-all">
            {{ t('buttons.headerManage') }}
          </router-link>
        </div>
        <img
          class="w-10/12 mx-auto md:h-auto md:w-[41%] md:min-w-[350px] drop-shadow-md order-1 md:order-2 shrink-0"
          src="/images/i_images.svg"
          alt="logo" />
      </div>
    </div>
  </header>
  <main>
    <section
      id="preview"
      class="px-4 py-8 flex flex-col items-stretch gap-10 md:gap-14">
      <h3
        :dir="direction"
        class="text-center text-2xl md:text-4xl text-gray-600 invisible animated">
        {{ t('texts.previewTitle') }}
        <span
          class="text-transparent bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text"
          >Action Vue</span
        >
      </h3>
      <video
        class="max-w-6xl w-full mx-auto rounded-lg shadow-md invisible animated"
        controls
        poster="/images/previewPoster.jpg"
        preload="none">
        <source src="/videos/preview.mp4" />
      </video>
    </section>
    <section
      id="features"
      class="px-4 py-8 flex flex-col items-stretch gap-10 md:gap-14">
      <h3
        :dir="direction"
        class="text-center text-2xl md:text-4xl text-gray-600 invisible animated">
        {{ t('texts.featuresTitle') }}
        <span
          class="text-transparent bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text"
          >Action Vue</span
        >
      </h3>
      <div
        class="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[38%]">
          <img class="w-full" src="/images/secure.svg" alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4 invisible animated">
          <h3 :dir="direction" class="text-2xl font-bold text-gray-800">
            {{ t('texts.secureTitle') }}
          </h3>
          <p
            :dir="direction"
            class="text-lg leading-8 text-justify text-gray-700">
            {{ t('texts.secureText') }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row-reverse items-stretch gap-12 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[38%]">
          <img
            class="w-full rounded-lg"
            src="/images/easytouse.svg"
            alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4 invisible animated">
          <h3 :dir="direction" class="text-2xl font-bold text-gray-800">
            {{ t('texts.easyToUseTitle') }}
          </h3>
          <p
            :dir="direction"
            class="text-lg leading-8 text-justify text-gray-700">
            {{ t('texts.easyToUseText') }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-stretch gap-12 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[38%]">
          <img class="w-full rounded-lg" src="/images/fast.svg" alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4 invisible animated">
          <h3 :dir="direction" class="text-2xl font-bold text-gray-800">
            {{ t('texts.fastTitle') }}
          </h3>
          <p
            :dir="direction"
            class="text-lg leading-8 text-justify text-gray-700">
            {{ t('texts.fastText') }}
          </p>
        </div>
      </div>
    </section>
    <section id="about" class="px-4 py-8 flex flex-col items-stretch gap-4">
      <h3
        :dir="direction"
        class="text-center text-2xl md:text-4xl text-gray-600 mb-6">
        {{ t('texts.aboutTitle') }}
      </h3>
      <Accordion class="max-w-6xl mx-auto">
        <template v-slot:title>{{ t('texts.loremTitle') }}</template>
        <template v-slot:text>{{ t('texts.easyToUseText') }}</template>
      </Accordion>
      <Accordion class="max-w-6xl mx-auto">
        <template v-slot:title>{{ t('texts.loremTitle') }}</template>
        <template v-slot:text>{{ t('texts.easyToUseText') }}</template>
      </Accordion>
    </section>
  </main>

  <Teleport to="body">
    <ScrollTopBtn
      class="fixed bottom-4 right-5 z-[15]"
      @click="scrollToTop"
      :percent="scrollPercent"
      :visible="showScrollToTopButton"
      color="rgb(15 118 110)" />
  </Teleport>
</template>

<script setup>
import HomeNavbar from '../components/Navigation/HomeNavbar.vue';
import HomeDrawer from '../components/Navigation/HomeDrawer.vue';
import Accordion from '../components/Buttons/Accordion.vue';
import ScrollTopBtn from '../components/Buttons/ScrollTop.vue';

import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useLocale } from '../composables/locale';
import { useAnimate } from '../composables/useAnimate';

const { t, direction } = useLocale();
const { animate } = useAnimate();

const navbarFixed = ref(false);
const navbarStyles = computed(() => navbarFixed.value ? ['fixed', 'top-0', 'left-0', 'right-0','bg-opacity-80', 'shadow-md', 'slide-top'] : [] ); // prettier-ignore

const scrollPercent = ref(0);
const showScrollToTopButton = ref(false);

function onScrollPage(oldScrollY) {
  const { scrollY, innerHeight } = window;
  const { scrollHeight } = document.body;
  const offset = 200;
  // for navbar
  if (scrollY > offset && !navbarFixed.value) {
    navbarFixed.value = true;
  }
  if (scrollY <= offset && navbarFixed.value) {
    navbarFixed.value = false;
  }
  // animate scrolling elements
  animate();
  // for scroll to top button
  scrollPercent.value = (scrollY / (scrollHeight - innerHeight)) * 100;

  if (oldScrollY.value > scrollY) showScrollToTopButton.value = true;
  else showScrollToTopButton.value = false;

  oldScrollY.value = scrollY;
}

function scrollToTop() {
  window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
}

onMounted(() => {
  const oldScrollY = ref(window.scrollY);
  document.addEventListener('scroll', () => onScrollPage(oldScrollY));
});
onBeforeUnmount(() => document.removeEventListener('scroll', onScrollPage));
</script>
