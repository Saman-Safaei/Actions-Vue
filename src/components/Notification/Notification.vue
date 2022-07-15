<template>
  <div
    class="flex flex-row flex-nowrap items-center gap-2 px-3 py-4 mb-2 bg-gradient-to-tr from-teal-500 to-teal-600 rounded-l-lg">
    <button @click="store.removeNotif(props.nId)" class="text-lime-200 shrink">
      x
    </button>
    <p :dir="direction" class="text-center text-lime-50 grow m-0">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { useNotifStore } from '../../stores/notification';
import { useLocale } from '../../composables/locale';

const { direction } = useLocale();
const store = useNotifStore();
const props = defineProps(['nId']);
</script>
