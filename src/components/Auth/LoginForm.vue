<template>
  <div class="bg-white rounded-md shadow w-full sm:w-3/5 md:w-2/5 py-6 px-5 select-none">
    <h3 class="text-center font-bold text-2xl mb-4 text-teal-800">Actions</h3>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 px-2 rounded-md mb-2">
        <UserCircleIcon class="w-8 h-8 text-gray-400" />
        <input class="grow" type="text" placeholder="Username" autocomplete="off" v-model="username">
      </div>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 px-2 rounded-md mb-4">
        <LockClosedIcon class="w-8 h-8 text-gray-400" />
        <input class="grow" type="text" placeholder="Password" autocomplete="off" v-model="password">
      </div>
      <button 
        class="block w-full bg-gradient-to-b from-teal-600 to-teal-700 text-white rounded-md px-4 py-3" 
        type="submit" :disabled="!isButtonEnabled">
          <template v-if="isButtonEnabled">Login</template>
          <template v-else>Please Wait ...</template>
        </button>
    </form>
    <p class="text-center mt-2.5">Don't have an account ? <a class="text-teal-700 cursor-pointer"
        @click.prevent="emits('switch')">Sign up</a> !</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/vue/outline";

import { useNotifStore } from "../../stores/notification";
import { useUserStore } from "../../stores/users";
import User from "../../models/users";
import { ref } from "vue";

// Other --------------------------------------------------
const isButtonEnabled = ref(true);

// Create and Use Stores ----------------------------------
const notifStore = useNotifStore();
const userStore = useUserStore();
// Get The Router -----------------------------------------
const router = useRouter();
// Define Switch Emit -------------------------------------
const emits = defineEmits(["switch"]);

// Initialize Form Validator ------------------------------
const { validate } = useForm({
  validationSchema: {
    username: "required|min:3",
    password: "required|min:8"
  }
});

// Initialize Fields --------------------------------------
const { value: username } = useField("username", undefined, { validateOnValueUpdate: false });
const { value: password } = useField("password", undefined, { validateOnValueUpdate: false });

// Handle onSubmit event of the login form ----------------
async function onSubmit() {
  const validationResult = await validate();
  if (validationResult.errors.username) notifStore.pushNotification(validationResult.errors.username);
  if (validationResult.errors.password) notifStore.pushNotification(validationResult.errors.password);

  if (validationResult.valid) {
    isButtonEnabled.value = false;

    User.login(username.value, password.value).then(response => {
      userStore.logIn(response.data.token, response.data.username);
      router.push({ name: "dashboard" });
    }).catch(result => {
      const message = (result.response.data) ? result.response.data.message : result.message;
      notifStore.pushNotification(message);
      isButtonEnabled.value = true;
    });
  }
}
</script>

<style lang="scss" scoped>
// @import "../../assets/styles/base/variables";


// .login {

//   display: block;
//   width: 100%;
//   padding: 1rem;

//   @media screen and (min-width: $sm) {
//     max-width: $sm;
//   }

//   .login__title {
//     font-size: 2.5rem;
//     text-align: center;
//     margin: 0 0 1.6rem 0;
//     font-weight: 900;
//     color: $light;
//   }

//   .login__input {
//     display: block;
//     width: 100%;
//     border: transparentize($color: $dark, $amount: 0.4) solid 0.15rem;
//     margin: 0.7rem 0;
//     padding: 0.7rem 0.8rem;
//     border-radius: 0.5rem;
//     color: $dark;
//     transition: 300ms;

//     &:focus {
//       border: $dark solid 0.15rem;

//     }

//     &::placeholder {
//       color: $dark;
//       opacity: 0.8;
//     }
//   }

//   .login__submit {
//     display: block;
//     width: 100%;
//     background: linear-gradient(5deg, $dark, $dark-green);
//     padding: 0.9rem 1rem;
//     border-radius: 0.5rem;
//     color: $light;
//     transition: 200ms;

//     &:active {
//       transform: scale(0.98);
//     }
//   }

//   .login__subtitle {
//     margin-top: 1.1rem;
//     text-align: center;
//     color: $dark;
//   }

//   .login__signup-url {
//     color: $link-color;
//   }
// }
</style>