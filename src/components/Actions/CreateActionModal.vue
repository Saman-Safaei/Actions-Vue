<template>
  <div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
  <div class="fixed inset-0 flex justify-center items-center px-4 z-20">
    <div class="relative w-full max-w-md">
      <button
        class="rounded-full w-6 h-6 bg-red-400 absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-white"
        @click="emits('close')">
        x
      </button>
      <div class="p-6 bg-slate-50 rounded w-full">
        <form novalidate class="flex flex-col" @submit.prevent="onFormSubmit">
          <label class="w-full mb-2">
            <div
              class="w-full p-2 border-dashed border-2 border-teal-600 rounded flex justify-center items-center shadow bg-white cursor-pointer">
              <p class="text-teal-700 w-full text-center px-2">
                {{ fileInputText }}
              </p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png"
              class="hidden"
              @change="onFileChoosen" />
          </label>
          <input
            dir="auto"
            type="text"
            :placeholder="t('texts.title')"
            class="w-full text-center rounded shadow py-2 mb-2 bg-white"
            v-model="titleValue" />
          <textarea
            dir="auto"
            class="resize-none h-32 rounded shadow p-2 bg-white mb-4"
            v-model="bodyValue"></textarea>
          <button
            type="submit"
            :disabled="pending"
            class="p-2 bg-gradient-to-tr from-teal-700 to-teal-500 text-white rounded">
            <template v-if="!pending">{{ t('buttons.create') }}</template>
            <template v-else>{{ t('buttons.wait') }}</template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useI18n } from 'vue-i18n';
import { useForm, useField } from 'vee-validate';

import { useCreateAction } from '../../composables/createAction';
import { useNotifStore } from '../../stores/notification';

const notifStore = useNotifStore();
const emits = defineEmits(['close', 'created']);
const props = defineProps(['title', 'text', 'type']);
const { t } = useI18n({ useScope: 'global' });

const { validate, errors } = useForm({
  validationSchema: {
    file: 'required',
    title: 'required|min:3',
    body: 'required|min:3',
  },
  initialValues: {
    file: undefined,
    title: '',
    body: props.text?.value,
  },
});

const { value: fileValue } = useField('file');
const { value: titleValue } = useField('title');
const { value: bodyValue } = useField('body');

const { pending, post } = useCreateAction(
  fileValue,
  titleValue,
  bodyValue,
  notifStore
);

function onFileChoosen(ev) {
  fileValue.value = ev.target.files[0];
}

function onFormSubmit() {
  validate().then(result => {
    if (result.valid)
      post(
        () => {
          emits('created');
          emits('close');
        },
        err => {
          console.log(err);
        }
      );
  });
}

const fileInputText = computed(() => {
  if (fileValue.value) return fileValue.value.name;
  return t('texts.chooseFile');
});
</script>
