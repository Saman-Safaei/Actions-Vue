<template>
  <Teleport to="body">

    <div class="backdrop"></div>
    <div class="content">
      <button class="btn" @click="emits('close')">&#x2715;</button>
      <div v-html="props.text"></div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps(["text"]);
const emits = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
// @import "../../assets/styles/base/variables";

// .backdrop {
//   position: fixed;
//   inset: 0 0 0 0;
//   background: black;
//   opacity: 0.2;
//   z-index: 10;
// }

// .content {
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translateX(-50%) translateY(-50%);
//   width: 90%;
//   max-height: $sm;
//   max-width: $md;
//   overflow-y: auto;
//   overflow-x: hidden;
//   background: white;
//   z-index: 11;
//   padding: 2rem 1rem 1rem 1rem;
//   border-radius: 0.2rem;

//   .btn {
//     position: absolute;
//     top: 0.2rem;
//     right: 0.2rem;
//     background-color: rgb(170, 0, 0);
//     padding: 0.1rem 0.2rem;
//     border-radius: 0.2rem;
//     color: white;
//   }
// }
</style>
