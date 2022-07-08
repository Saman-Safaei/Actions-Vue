<template>
  <header>
    <HomeNavbar :class="navbarStyles" />
    <div class="h-16" v-show="navbarFixed"></div>
    <HomeDrawer />
    <div class="bg-gray-50 p-8">
      <div
        class="flex flex-col md:flex-row items-stretch gap-x-16 gap-y-8 max-w-6xl mx-auto">
        <div
          class="flex flex-col order-2 md:order-1 gap-3 justify-center items-center md:items-start flex-grow">
          <h1
            class="text-4xl md:text-5xl font-bold text-transparent text-center md:text-start bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text">
            Actions Vue
          </h1>
          <p class="text-lg text-center text-gray-600 md:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            eveniet quo repellendus. Nisi quos voluptas maxime ab doloremque nam
            officiis qui aspernatur eius soluta natus quae, reprehenderit
            aperiam, praesentium unde.
          </p>
          <button
            class="mt-4 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2.5 rounded-full transition-all">
            Manage your notes
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
      id="features"
      class="px-4 py-8 flex flex-col items-stretch gap-10 md:gap-14">
      <h3 class="text-center text-2xl md:text-4xl text-gray-600">
        Features of
        <span
          class="text-transparent bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text"
          >Action Vue</span
        >
      </h3>
      <div
        class="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto">
        <img class="md:max-w-md" src="/images/preview.png" alt="preview" />
        <div class="flex flex-col gap-2 grow py-4">
          <h3 class="text-xl font-bold">Secure</h3>
          <p class="text-lg text-gray-700">
            Your can easily upload your images with a simple note in our cloud
            database. Your images are secure and not accessible for another
            people.
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row-reverse items-stretch gap-4 max-w-6xl mx-auto">
        <img class="md:max-w-md" src="/images/preview.png" alt="preview" />
        <div class="flex flex-col gap-2 grow py-4">
          <h3 class="text-xl font-bold">Easy to use</h3>
          <p class="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto">
        <img class="md:max-w-md" src="/images/preview.png" alt="preview" />
        <div class="flex flex-col gap-2 grow py-4">
          <h3 class="text-xl font-bold">Fast</h3>
          <p class="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

const navbarFixed = ref(false);
const navbarStyles = computed(() =>
  navbarFixed.value
    ? {
        fixed: true,
        'top-0': true,
        'left-0': true,
        'right-0': true,
        'bg-opacity-80': true,
        'shadow-md': true,
        'slide-top': true,
      }
    : {}
);
function onScrollPage() {
  if (window.scrollY > 200 && !navbarFixed.value) {
    navbarFixed.value = true;
  }
  if (window.scrollY <= 200 && navbarFixed.value) {
    navbarFixed.value = false;
  }
}

onMounted(() => {
  document.addEventListener('scroll', onScrollPage);
});
onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScrollPage);
});
</script>
