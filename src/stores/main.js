import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const showCreateModal = ref(false);

  function toggleModal() {
    showCreateModal.value = !showCreateModal.value;
  }

  return { showCreateModal, toggleModal };
});
