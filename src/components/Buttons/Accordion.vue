<template>
  <div v-bind="$attrs" class="w-full drop-shadow">
    <div
      :dir="direction"
      class="bg-white p-4 rounded-t-md cursor-pointer relative"
      :class="!isOpen ? ['rounded-b-md'] : []"
      @click="isOpen = !isOpen">
      <h3 class="text-lg select-none"><slot name="title"></slot></h3>
      <component
        :is="arrowIcon"
        class="absolute top-1/2 -translate-y-1/2 w-6 h-6"
        :class="direction === 'rtl' ? ['left-4'] : ['right-4']" />
    </div>
    <div class="p-4 bg-gray-100 rounded-b-md" v-show="isOpen">
      <p :dir="direction"><slot name="text"></slot></p>
    </div>
  </div>
</template>

<script setup>
import { useLocale } from '../../composables/locale';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';

const { t, direction } = useLocale();

const isOpen = ref(false);
const arrowIcon = computed(() =>
  isOpen.value ? ChevronRightIcon : ChevronDownIcon
);
</script>
