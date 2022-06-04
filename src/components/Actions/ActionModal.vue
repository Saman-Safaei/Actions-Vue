<template>
  <Teleport to="body">

    <div class="fixed inset-0 bg-black opacity-30 z-10"></div>
    <div
      class="fixed bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-md max-h-[50vh] overflow-x-hidden overflow-y-auto z-[11] rounded-md pt-8 pb-4 px-4 select-none">
      <button class="absolute top-1 right-1 bg-red-400 w-6 h-6 rounded-md align-middle text-white" @click="emits('close')">&#x2715;</button>
      <div v-html="props.text"></div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps(["text"]);
const emits = defineEmits(["close"]);
</script>
