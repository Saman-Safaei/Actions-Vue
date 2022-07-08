<template>
  <template v-if="props.type === 'router-link'">
    <router-link v-bind="$attrs" :to="props.to" @click="onClick"
      ><slot></slot
    ></router-link>
  </template>
  <template v-if="props.type === 'a'">
    <a v-bind="$attrs" :href="props.href" @click="onClick()"><slot></slot></a>
  </template>
</template>

<script setup>
import { useMainStore } from "../../stores/main";

const mainStore = useMainStore();
const props = defineProps(["type", "to", "href", "tapped"]);

function onClick() {
  if (props.tapped === "enabled") mainStore.toggleHomeDrawer();
}
</script>
