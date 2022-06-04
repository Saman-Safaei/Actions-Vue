<template>
  <div class="bg-white rounded-md shadow w-full sm:w-3/5 md:w-2/5 py-6 px-5 select-none">
    <h3 class="text-center font-bold text-2xl mb-4 text-teal-800">Actions</h3>
    <form @submit.prevent="onSubmit" novalidate>

      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 px-2 rounded-md mb-2">
        <UserCircleIcon class="w-8 h-8 text-gray-400" />
        <input class="grow" type="text" placeholder="Username" autocomplete="off" v-model="username">
      </div>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 px-2 rounded-md mb-2">
        <MailIcon class="w-8 h-8 text-gray-400" />
        <input class="signup__input" type="email" placeholder="Email Address" autocomplete="off" v-model="email">
      </div>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 px-2 rounded-md mb-4">
        <LockClosedIcon class="w-8 h-8 text-gray-400" />
        <input class="signup__input" type="text" placeholder="Password" autocomplete="off" v-model="password">
      </div>
      <button 
        class="block w-full bg-gradient-to-b from-teal-600 to-teal-700 text-white rounded-md px-4 py-3" 
        type="submit">Sign up</button>
    </form>
    <p class="text-center mt-2.5">Have an account ? <a class="text-teal-700 cursor-pointer" @click.prevent="emits('switch')">Login</a> !</p>
  </div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { UserCircleIcon, MailIcon, LockClosedIcon } from "@heroicons/vue/outline";

import { useNotifStore } from "../../stores/notification";
import User from "../../models/users";


const notifStore = useNotifStore();
const emits = defineEmits(["switch"]);

const { validate } = useForm({
  validationSchema: {
    username: "required|min:3",
    email: "required|email",
    password: "required|min:8"
  }
});

const { value: username } = useField("username", undefined, { validateOnValueUpdate: false });
const { value: email } = useField("email", undefined, { validateOnValueUpdate: false });
const { value: password } = useField("password", undefined, { validateOnValueUpdate: false });


async function onSubmit() {
  const validationResult = await validate();
  if (validationResult.errors.username) notifStore.pushNotification(validationResult.errors.username);
  if (validationResult.errors.email) notifStore.pushNotification(validationResult.errors.email);
  if (validationResult.errors.password) notifStore.pushNotification(validationResult.errors.password);

  if (validationResult.valid) {
    const user = new User(username.value, password.value, email.value);
    user.signup().then(response => {
      notifStore.pushNotification(response.data.message);
      emits("switch");
    }).catch(result => {
      notifStore.pushNotification(result.response.data.message);
    });
  }
}
</script>

<style lang="scss" scoped>
// @import "../../assets/styles/base/variables";

// .signup {
//   display: block;
//   width: 100%;
//   padding: 1rem;

//   @media screen and (min-width: $sm) {
//     max-width: $sm;
//   }

//   .signup__title {
//     font-size: 2.5rem;
//     text-align: center;
//     margin: 0 0 1.6rem 0;
//     font-weight: 900;
//     color: $light;
//   }

//   .signup__input {
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

//   .signup__submit {
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

//   .signup__subtitle {
//     margin-top: 1.1rem;
//     text-align: center;
//     color: $dark;
//   }

//   .signup__login-url {
//     color: $link-color;
//   }
// }
</style>
