<template>
  <div class="flex flex-row min-h-[90vh] md:min-h-[98vh] items-center justify-center">
    <Transition name="home-slide" mode="out-in">
      <component :is="component" @switch="swithComponent" />
    </Transition>
  </div>
</template>

<script setup>
import SignUp from '../components/Auth/SignUp.vue';
import Login from '../components/Auth/LoginForm.vue';

import { ref, computed } from 'vue';


const showLogin = ref(true);

function swithComponent() {
  showLogin.value = !showLogin.value;
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