<template>
  <div v-bind="$attrs" class="w-full drop-shadow-md">
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
    <Transition name="scaleY">
      <div
        class="p-4 bg-gray-50 rounded-b-md border-solid border-t-4 border-gray-200 origin-top"
        v-show="isOpen">
        <p class="text-justify leading-7" :dir="direction">
          <slot name="text"></slot>
        </p>
      </div>
    </Transition>
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

<style scoped>
.scaleY-enter-from,
.scaleY-leave-to {
  transform: scaleY(0);
}

.scaleY-enter-active,
.scaleY-leave-active {
  transition: all 350ms ease-in-out;
}
</style>
