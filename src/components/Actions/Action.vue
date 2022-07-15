<template>
  <div class="relative w-full overflow-hidden rounded-md shadow">
    <img
      class="object-cover block w-full aspect-square cursor-pointer z-0"
      :src="img"
      @click="emits('imgClicked')"
      :alt="props.title" />
    <div
      class="flex flex-row justify-start items-center gap-1 p-3 absolute bottom-0 right-0 left-0 z-10 bg-content shadow-[0_-2px_8px_0_rgba(0,0,0,0.1)]">
      <h4 class="grow overflow-hidden whitespace-nowrap text-ellipsis">
        {{ props.title }}
      </h4>
      <span class="flex flex-row justify-end items-center gap-1">
        <TrashIcon
          class="h-5 w-5 text-gray-700 cursor-pointer"
          @click="emits('delete')" />
        <a class="cursor-pointer" :href="img" :download="props.img"
          ><DownloadIcon class="h-5 w-5 text-gray-700" />
        </a>
        <PencilIcon
          class="h-5 w-5 text-gray-700 cursor-pointer"
          @click="emits('edit')" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { baseURL } from '../../api';
import { TrashIcon, DownloadIcon, PencilIcon } from '@heroicons/vue/outline';
import { useUserStore } from '../../stores/users';

const userStore = useUserStore();
const props = defineProps(['img', 'title', 'body', 'id']);
const emits = defineEmits(['imgClicked', 'delete', 'edit']);

const img = computed(() => {
  return baseURL + '/files/' + props.img + '/?token=' + userStore.token;
});
</script>

<style lang="scss" scoped>
.bg-content {
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.6);
}
@supports not (backdrop-filter: blur(4px)) {
  .bg-content {
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>
