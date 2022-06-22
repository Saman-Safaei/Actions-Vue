<template>
  <div :dir="direction" class="flex flex-row items-center gap-1.5 p-3 shadow-md rounded-md bg-white">
  
    <OutlinedButton @click="mainStore.toggleModal">{{ t("buttons.new") }}</OutlinedButton>
    <OutlinedButton @click="logoutAndPush">{{ t("buttons.logout") }}</OutlinedButton>

    <span class="grow"></span>

    <button class="border-solid border-b-4 border-teal-600" @click="changeLang">{{ locale }}</button>
    <img class="w-8 h-8" src="@/assets/logo.svg" alt="brand">

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/users";
import { useMainStore } from "../../stores/main";
import OutlinedButton from "../Buttons/OutlinedButton.vue";


const mainStore = useMainStore();
const userStore = useUserStore();
const router = useRouter();

const { t, locale } = useI18n({ useScope: "global" });

function logoutAndPush() {
  userStore.logOut();
  router.push({ name: "auth" });
}
function changeLang() {
  locale.value === "en" ? locale.value = 'fa' : locale.value = 'en';
}

const direction = computed(() => {
  return (locale.value === "fa") ? "rtl" : "ltr";
});
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/base/variables";

// .navbar {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   gap: 0.3rem;
//   padding: $p-sm $p-md;
//   background: $light;
//   border-radius: 1rem;
//   box-shadow: rgba(0, 0, 0, 0.1) 0 3px 4px;

//   .navbar__img {
//     width: 1.5rem;
//     height: 1.5rem;
//     object-fit: contain;
//   }

//   .navbar__spacer {
//     flex-grow: 1;
//   }


//   .navbar__item--btn {
//     background: $dark-green;
//     padding: $p-xs2 $p-xs;
//     border-radius: 0.4rem;
//     color: $light;
//     transition: all 200ms;
//     font-size: 0.9rem;

//     &:hover {
//       background: $green;
//     }

//     &:active {
//       background: $dark;
//     }
//   }


// }
</style>
