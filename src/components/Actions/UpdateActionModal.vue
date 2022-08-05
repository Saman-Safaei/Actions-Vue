<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
  <div class="fixed inset-0 flex justify-center items-center px-4 z-20">
    <div class="relative w-full max-w-md">
      <button
        :disabled="pending"
        class="rounded-full w-6 h-6 bg-red-400 absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-white"
        @click="emits('close')">
        x
      </button>
      <div class="p-6 bg-slate-50 rounded w-full">
        <form novalidate class="flex flex-col" @submit.prevent="onFormSubmit">
          <input
            dir="auto"
            type="text"
            :placeholder="'test'"
            class="w-full text-center rounded shadow py-2 mb-2 bg-white"
            v-model="title" />
          <textarea
            dir="auto"
            class="resize-none h-32 rounded shadow p-2 bg-white mb-4"
            v-model="body"></textarea>
          <button
            type="submit"
            :disabled="pending"
            class="p-2 bg-gradient-to-tr from-teal-700 to-teal-500 text-white rounded">
            <template v-if="!pending">{{ t('buttons.update') }}</template>
            <template v-else>{{ t('buttons.wait') }}</template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import { useNotifStore } from '../../stores/notification.js';
import { useEditAction } from '../../composables/editAction';
import { useLocale } from '../../composables/locale.js';

const emits = defineEmits(['close', 'update']);
const props = defineProps(['title', 'body', 'actionId']);
const { t, direction } = useLocale();
const notifStore = useNotifStore();

const { validate } = useForm({
  validationSchema: {
    title: 'min:3|required',
    body: 'min:3|required',
  },
  initialValues: {
    title: props.title,
    body: props.body,
  },
});

const { value: title } = useField('title', undefined, {
  validateOnValueUpdate: false,
});
const { value: body } = useField('body', undefined, {
  validateOnValueUpdate: false,
});

const { pending, put } = useEditAction(props.actionId, title, body, notifStore);

const onFormSubmit = async () => {
  const validationResult = await validate();

  if (validationResult.errors.title)
    notifStore.pushNotification(validationResult.errors.title);
  if (validationResult.errors.body)
    notifStore.pushNotification(validationResult.errors.body);

  if (validationResult.valid) {
    put(
      () => {
        emits('update');
        emits('close');
      },
      err => {
        console.error(err);
      }
    );
  }
};
</script>
