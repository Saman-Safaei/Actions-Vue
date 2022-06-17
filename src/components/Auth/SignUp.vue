<template>
  <div :dir="direction" class="bg-white rounded-md shadow w-full max-w-sm py-6 px-5 select-none">
    <h3 class="text-center font-bold text-2xl mb-4 text-teal-800">Actions</h3>
    <form dir="ltr" @submit.prevent="onSubmit" novalidate>

      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 pl-2 pr-4 rounded-md mb-2">
        <UserCircleIcon class="w-8 h-8 text-gray-400 shrink-0" />
        <input :dir="direction" class="grow min-w-0" type="text" :placeholder="t('texts.username')" autocomplete="off" v-model="username">
      </div>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 pl-2 pr-4 rounded-md mb-2">
        <MailIcon class="w-8 h-8 text-gray-400 shrink-0" />
        <input :dir="direction" class="grow min-w-0" type="email" :placeholder="t('texts.email')" autocomplete="off" v-model="email">
      </div>
      <div class="flex flex-row flex-nowrap items-stretch gap-2 bg-gray-200 py-2 pl-2 pr-4 rounded-md mb-4">
        <LockClosedIcon class="w-8 h-8 text-gray-400 shrink-0" />
        <input :dir="direction" class="grow min-w-0" type="text" :placeholder="t('texts.password')" autocomplete="off" v-model="password">
      </div>
      <button :dir="direction" class="block w-full bg-gradient-to-b from-teal-600 to-teal-700 text-white rounded-md px-4 py-3"
        type="submit" :disabled="!isButtonEnabled">

        <template v-if="isButtonEnabled">{{ t("buttons.signup") }}</template>
        <template v-else>{{ t("buttons.wait") }}</template>

      </button>
    </form>
    <p class="text-center mt-2.5">{{ t("texts.haveAccount") }} <a class="text-teal-700 cursor-pointer"
        @click.prevent="emits('switch')">{{ t("buttons.login") }}</a> !</p>
  </div>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { UserCircleIcon, MailIcon, LockClosedIcon } from "@heroicons/vue/outline";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useNotifStore } from "../../stores/notification";
import User from "../../models/users";

const isButtonEnabled = ref(true);
const notifStore = useNotifStore();
const emits = defineEmits(["switch"]);

const { t, locale } = useI18n({ useScope: "global" });
const direction = computed(() => (locale.value === "fa") ? "rtl" : "ltr");

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
    isButtonEnabled.value = false;

    const user = new User(username.value, password.value, email.value);
    user.signup().then(response => {
      notifStore.pushNotification(response.data.message);
      emits("switch");
    }).catch(result => {
      isButtonEnabled.value = true;
      const message = (result.response.data) ? result.response.data.message : result.message;
      notifStore.pushNotification(message);
    });
  }
}
</script>
