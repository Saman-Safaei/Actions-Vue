<template>
  <header class="p-3">
    <Navbar />
  </header>
  <main>
    <ActionsLayout v-show="dataLoaded && haveData">
      <Action
        v-for="action in actions"
        :key="action.id"
        :title="action.title"
        :img="action.img"
        @img-clicked="openModal(action.id)"
        @delete="deleteAction(action.id)" />
    </ActionsLayout>

    <PlaceHolderActions v-show="!dataLoaded" />

    <div class="text-center px-3 py-4" v-show="dataLoaded && !haveData">
      <h3>{{ t('texts.noAction') }}</h3>
      <p>{{ t('texts.createAction') }}</p>
    </div>

    <ActionModal :text="modalData" @close="closeModal" v-if="showModal" />
    <CreateActionModal
      v-if="mainStore.showCreateModal"
      @close="mainStore.toggleModal"
      @created="reloadActions" />
  </main>
</template>

<script setup>
import Navbar from '../components/Navigation/Navbar.vue';
import ActionsLayout from '../components/Actions/ActionsLayout.vue';
import Action from '../components/Actions/Action.vue';
import ActionModal from '../components/Actions/ActionModal.vue';
import PlaceHolderActions from '../components/Actions/PlaceHolderActions.vue';
import CreateActionModal from '../components/Actions/CreateActionModal.vue';

import { useUserStore } from '../stores/users';
import { useMainStore } from '../stores/main';
import { useAllActions } from '../composables/getActions';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDeleteAction } from '../composables/deleteAction';

const router = useRouter();
const userStore = useUserStore();
const mainStore = useMainStore();

const {
  data: actions,
  loaded: dataLoaded,
  load: reloadActions,
} = useAllActions(router, userStore);
const haveData = computed(() => actions.length !== 0);
const { t } = useI18n({ useScope: 'global' });

// Cards Modal
const showModal = ref(false);
const modalData = ref('');

function openModal(cardId) {
  showModal.value = true;
  modalData.value = actions.find(value => value.id === cardId).body;
}
function closeModal() {
  showModal.value = false;
}

// Card Actions
const {
  pending: pendingDelete,
  error: deleteError,
  deleteAction,
} = useDeleteAction(reloadActions);
</script>

<style lang="scss" scoped>
.no-todo {
  text-align: center;
}
</style>
