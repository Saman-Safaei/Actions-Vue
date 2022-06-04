<template>
  <nav class="flex flex-row items-center gap-1.5 p-3 shadow-md rounded-md mt-3 mb-2 bg-white">

    <router-link 
      :to="{ name: 'createaction' }" 
      class="border-solid border-2 border-teal-600 rounded-md px-2 py-1 text-teal-600 hover:text-white hover:bg-teal-600 transition ease-linear">New</router-link>

    <OutlinedButton @click="logoutAndPush" >Logout</OutlinedButton>

    <span class="grow"></span>

    <img class="w-8 h-8" src="@/assets/logo.svg" alt="brand">

  </nav>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "../../stores/users";
import OutlinedButton from "../Buttons/OutlinedButton.vue";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(useUserStore, ['logOut']),
    logoutAndPush() {
      this.logOut();
      this.$router.push({ name: "auth" });
    }
  },
  components: {
    OutlinedButton
  }
}
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
