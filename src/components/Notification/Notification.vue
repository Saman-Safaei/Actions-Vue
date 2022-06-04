<template>
  <div class="flex flex-row flex-nowrap gap-2 px-3 py-4 mb-2 bg-gradient-to-tr from-teal-500 to-teal-600 rounded-l-lg">
    <button @click="store.removeNotif(props.nId)" class="text-lime-200 shrink">x</button>
    <p class="text-center text-lime-50 grow"><slot></slot></p>
  </div>
</template>

<script setup>
import { useNotifStore } from '../../stores/notification';

const store = useNotifStore();
const props = defineProps(["nId"]);
</script>

<style lang="scss" scoped>

.notification {
  // display: flex;
  // padding: 1rem 0.6rem;
  // margin-bottom: 0.5rem;
  // background: linear-gradient(6deg, $dark, $dark-green);
  // border-radius: 0.5rem 0 0 0.5rem;
  // box-shadow: $light-green 0 2px 5px ;
  // flex-direction: row;
  // flex-wrap: nowrap;

  .notification__remove {
    // color: $light-green;
    flex-shrink: 1;
  }
  .notification__content {
    text-align: center;
    // color: $light;
    flex-grow: 1;
  }
}
</style>
