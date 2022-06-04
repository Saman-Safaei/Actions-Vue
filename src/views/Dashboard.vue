<template>
  <Navbar />
  <ActionsLayout v-show="dataLoaded">
    <Action v-for="action in actions" :key="action.id" :title='action.title' :img="action.img"
      @img-clicked="openModal(action.id)" @delete="deleteAction(action.id)" />
  </ActionsLayout>

  <div class="no-todo" v-show="dataLoaded && actions.length === 0">
    <h3>There is no action to show</h3>
    <p>Click on "New" button on navbar to create an action.</p>
  </div>

  <PlaceHolderActions class="no-todo" v-show="!dataLoaded" />

  <ActionModal :text="modalData" @close="closeModal" v-if="showModal" />
</template>

<script setup>
import Navbar from '../components/Navigation/Navbar.vue';
import ActionsLayout from '../components/Actions/ActionsLayout.vue';
import Action from '../components/Actions/Action.vue';
import ActionModal from '../components/Actions/ActionModal.vue';
import PlaceHolderActions from '../components/Actions/PlaceHolderActions.vue';

import { reactive, ref } from 'vue';
import Actions from '../models/actions';
import { useRouter } from 'vue-router';


const router = useRouter();
// Initial data for loading...
const actions = reactive([]);
const dataLoaded = ref(false);

async function getData() {
  try {
    const data = await Actions.getAll();
    actions.length = 0;
    actions.push(...data);
    dataLoaded.value = true;
  } catch (err) {
    if (err.response.status === 401) {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      router.push({ name: "auth" });
    }
  }
}

// Loading data for the first time
getData();

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
  getData();
}
</script>

<style lang="scss" scoped>
.no-todo {
  text-align: center;
}
</style>
