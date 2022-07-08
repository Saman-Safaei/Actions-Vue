<template>
  <div
    class="flex flex-col px-2 min-h-[90vh] md:min-h-[98vh] items-center justify-center"
  >
    <Transition name="auth-fade" mode="out-in">
      <component :is="component" @switch="switchComponent" />
    </Transition>
    <div
      :dir="direction"
      class="flex flex-row justify-between w-full max-w-sm py-2 px-3"
    >
      <router-link :to="{ name: 'about' }" class="text-teal-900">{{
        t("texts.about")
      }}</router-link>
      <span class="flex flex-row gap-2">
        <button @click="switchLang" class="text-teal-800">{{ locale }}</button>
        <GlobeIcon class="text-gray-500 h-5 w-5" />
      </span>
    </div>
  </div>
  <ActionModal
    :center="true"
    v-if="showMessage"
    text="Make sure of your enabled VPN<br>مطمئن شوید به فیلتر شکن متصل اید"
    @close="closeMessage"
  />
  <div
    class="fixed inset-0 bg-gradient-to-tr from-teal-100 to-teal-200 -z-20"
  ></div>
</template>

<script setup>
import SignUp from "../components/Auth/SignUp.vue";
import Login from "../components/Auth/LoginForm.vue";
import ActionModal from "../components/Actions/ActionModal.vue";

import { ref, computed } from "vue";
import { GlobeIcon } from "@heroicons/vue/outline";
import { useLocale } from "../composables/locale";

const showLogin = ref(true);
const showMessage = ref(true);

const { t, direction, switchLang, locale } = useLocale();

function switchComponent() {
  showLogin.value = !showLogin.value;
}

function closeMessage() {
  showMessage.value = false;
}

const component = computed(() => {
  if (showLogin.value) return Login;
  else return SignUp;
});
</script>

<style lang="scss" scoped>
.auth-fade-enter-from {
  opacity: 0;
}

.auth-fade-leave-to {
  opacity: 0;
}

.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
