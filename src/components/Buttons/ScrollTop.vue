<template>
  <Transition name="shown">
    <div
      v-if="props.visible && !(percent <= 0)"
      class="w-14 h-14 p-1 conic-gradient rounded-full drop-shadow-md"
      :class="attrs.class">
      <button
        class="w-12 h-12 p-3 bg-white rounded-full"
        @click="attrs.onClick">
        <chevron-up-icon class="w-full h-full text-gray-500" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ChevronUpIcon } from '@heroicons/vue/outline';
import { computed, useAttrs } from 'vue';

const props = defineProps({
  percent: Number,
  visible: Boolean,
  color: String,
});
const attrs = useAttrs();
const fillDeg = computed(() => {
  return props.color + ' ' + (360 / 100) * props.percent + 'deg';
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.conic-gradient {
  background: conic-gradient(v-bind(fillDeg), transparent 0deg);
}

.shown-enter-from,
.shown-leave-to {
  opacity: 0;
  transform: rotateZ(360deg);
}

.shown-enter-active,
.shown-leave-active {
  transition: all 500ms ease-in-out;
}
</style>
