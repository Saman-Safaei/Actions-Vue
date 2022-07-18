<template>
  <Teleport to="body">
    <div
      v-bind="$attrs"
      class="fixed inset-0 flex justify-center items-center z-10 p-6">
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"></div>
      <div class="relative w-full max-w-md">
        <button
          @click="emits('close')"
          class="rounded-full w-6 h-6 bg-red-400 absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 text-white">
          x
        </button>
        <div
          class="bg-white w-full max-h-72 overflow-x-hidden overflow-y-auto rounded-md px-4 pb-4 pt-6 hide-scrollbar"
          :class="center">
          <p v-for="paragraph in paragraphs" dir="auto">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps(['text', 'center']);
const emits = defineEmits(['close']);
const attrs = useAttrs();

const center = computed(() => ({ 'text-center': props.center }));
const paragraphs = computed(() => props.text.split('\n'));
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
