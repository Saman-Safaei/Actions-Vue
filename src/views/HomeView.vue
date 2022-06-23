<template>
  <header>
    <HomeNavbar />
    <HomeDrawer />
    <div class="bg-white p-8">
      <div class="flex flex-col md:flex-row items-stretch gap-x-16 gap-y-8 max-w-6xl mx-auto">
        <div class="flex flex-col order-2 md:order-1 gap-3 justify-center items-center md:items-start flex-grow">
          <h1
            class="text-4xl md:text-5xl font-bold text-transparent text-center md:text-start bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text">
            Actions Vue</h1>
          <p class="text-lg text-center text-gray-600 md:text-start">Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Magni eveniet quo repellendus. Nisi quos voluptas maxime ab doloremque nam officiis qui aspernatur
            eius soluta natus quae, reprehenderit aperiam, praesentium unde.</p>
          <button class="mt-4 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white px-4 py-2.5 rounded-full transition-all">Manage your
            notes</button>
        </div>
        <img class="w-10/12 mx-auto md:h-80 md:w-auto drop-shadow-lg order-1 md:order-2" src="/images/i_images.svg"
          alt="logo">
      </div>

    </div>
  </header>
  <main class="max-w-6xl mx-auto">
    
  </main>
</template>

<script setup>
import HomeNavbar from '../components/Navigation/HomeNavbar.vue';
import HomeDrawer from '../components/Navigation/HomeDrawer.vue';
</script>
