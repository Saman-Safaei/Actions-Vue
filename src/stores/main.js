import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main", () => {
  const showCreateModal = ref(false);
  const showUpdateModal = ref(false);
  const showHomeDrawer = ref(false);

  function toggleModal() {
    showCreateModal.value = !showCreateModal.value;
  }
  function toggleHomeDrawer() {
    showHomeDrawer.value = !showHomeDrawer.value;
  }

  function toggleUpdateModal() {
    showUpdateModal.value = !showUpdateModal.value;
  }

  return { showCreateModal, toggleModal, showHomeDrawer, toggleHomeDrawer, toggleUpdateModal, showUpdateModal };
});
