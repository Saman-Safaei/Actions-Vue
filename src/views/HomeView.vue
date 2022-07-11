<template>
  <header>
    <HomeNavbar :class="navbarStyles" />
    <div class="h-16" v-show="navbarFixed"></div>
    <HomeDrawer />
    <div class="bg-gray-50 p-8">
      <div
        :dir="direction"
        class="flex flex-col md:flex-row items-stretch gap-x-16 gap-y-8 max-w-6xl mx-auto">
        <div
          class="flex flex-col order-2 md:order-1 gap-3 justify-center items-center md:items-start flex-grow">
          <h1
            class="text-4xl md:text-5xl font-bold text-transparent text-center md:text-start bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text">
            Actions Vue
          </h1>
          <p class="text-lg text-center text-gray-600 md:text-start">
            {{ t('texts.headerText') }}
          </p>
          <button
            class="mt-4 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2.5 rounded-full transition-all">
            {{ t('buttons.headerManage') }}
          </button>
        </div>
        <img
          class="w-10/12 mx-auto md:h-80 md:w-auto drop-shadow-lg order-1 md:order-2"
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
        class="text-center text-2xl md:text-4xl text-gray-600">
        {{ t('texts.previewTitle') }}
        <span
          class="text-transparent bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text"
          >Action Vue</span
        >
      </h3>
      <video
        class="max-w-6xl w-full mx-auto rounded-lg shadow-md"
        controls
        poster="/images/previewPoster.jpg"
        preload="metadata">
        <source src="/videos/preview.mp4" />
      </video>
    </section>
    <section
      id="features"
      class="px-4 py-8 flex flex-col items-stretch gap-10 md:gap-14">
      <h3
        :dir="direction"
        class="text-center text-2xl md:text-4xl text-gray-600">
        {{ t('texts.featuresTitle') }}
        <span
          class="text-transparent bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text"
          >Action Vue</span
        >
      </h3>
      <div
        class="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[42%]">
          <img class="w-full" src="/images/preview.png" alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4">
          <h3 :dir="direction" class="text-xl font-bold text-gray-800">
            {{ t('texts.secureTitle') }}
          </h3>
          <p :dir="direction" class="text-lg text-gray-700">
            {{ t('texts.secureText') }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row-reverse items-stretch gap-4 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[42%]">
          <img class="w-full" src="/images/preview.png" alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4">
          <h3 :dir="direction" class="text-xl font-bold text-gray-800">
            {{ t('texts.easyToUseTitle') }}
          </h3>
          <p :dir="direction" class="text-lg text-gray-700">
            {{ t('texts.easyToUseText') }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto invisible animated">
        <div class="w-full md:w-auto md:min-w-[42%]">
          <img class="w-full" src="/images/preview.png" alt="preview" />
        </div>
        <div class="flex flex-col gap-2 grow py-4">
          <h3 :dir="direction" class="text-xl font-bold text-gray-800">
            {{ t('texts.fastTitle') }}
          </h3>
          <p :dir="direction" class="text-lg text-gray-700">
            {{ t('texts.fastText') }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import HomeNavbar from '../components/Navigation/HomeNavbar.vue';
import HomeDrawer from '../components/Navigation/HomeDrawer.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useLocale } from '../composables/locale';
import { useAnimate } from '../composables/useAnimate';

const { t, direction } = useLocale();
const { animate } = useAnimate();

const navbarFixed = ref(false);
const navbarStyles = computed(() => navbarFixed.value ? ['fixed', 'top-0', 'left-0', 'right-0','bg-opacity-80', 'shadow', 'slide-top'] : [] ); // prettier-ignore

function onScrollPage() {
  // for navbar
  if (window.scrollY > 200 && !navbarFixed.value) {
    navbarFixed.value = true;
  }
  if (window.scrollY <= 200 && navbarFixed.value) {
    navbarFixed.value = false;
  }
  // animate scrolling elements
  animate();
}

onMounted(() => document.addEventListener('scroll', onScrollPage));
onBeforeUnmount(() => document.removeEventListener('scroll', onScrollPage));
</script>
