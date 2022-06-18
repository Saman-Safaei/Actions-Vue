<template>
  <Navbar />
  <ActionsLayout v-show="dataLoaded">
    <Action v-for="action in actions" :key="action.id" :title='action.title' :img="action.img"
      @img-clicked="openModal(action.id)" @delete="deleteAction(action.id)" />
  </ActionsLayout>

  <div class="text-center" v-show="dataLoaded && actions.length === 0">
    <h3>{{ t("texts.noAction") }}</h3>
    <p>{{ t("texts.createAction") }}</p>
  </div>

  <PlaceHolderActions v-show="!dataLoaded" />

  <ActionModal :text="modalData" @close="closeModal" v-if="showModal" />

  <CreateActionModal v-if="mainStore.showCreateModal" @close="mainStore.toggleModal" @created="reloadActions" />
</template>

<script setup>
import Navbar from '../components/Navigation/Navbar.vue';
import ActionsLayout from '../components/Actions/ActionsLayout.vue';
import Action from '../components/Actions/Action.vue';
import ActionModal from '../components/Actions/ActionModal.vue';
import PlaceHolderActions from '../components/Actions/PlaceHolderActions.vue';
import CreateActionModal from '../components/Actions/CreateActionModal.vue';

import Actions from '../models/actions';
import { useUserStore } from '../stores/users';
import { useMainStore } from '../stores/main';
import { useAllActions } from '../composables/getActions';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


const router = useRouter();
const userStore = useUserStore();
const mainStore = useMainStore();

const { data: actions, loaded: dataLoaded, load: reloadActions } = useAllActions(router, userStore);
const { t } = useI18n({ useScope: "global" });

// Cards Modal
const showModal = ref(false);
const modalData = ref("");

function openModal(cardId) {
  showModal.value = true;
  modalData.value = actions.find((value) => value.id === cardId).body;
}
function closeModal() {
  showModal.value = false;
}

// Card Actions
async function deleteAction(id) {
  await Actions.delete(id);
  dataLoaded.value = false;
  reloadActions();
}
</script>

<style lang="scss" scoped>
.no-todo {
  text-align: center;
}
</style>
