<template>
  <div class="create-action">
    <div class="image-select">
      <label>
        <div class="create-action__file-group">
          <img ref="img" class="create-action__image">
          <p v-show="showUploadTxt" class="create-action__upload-text">Click here to select an image</p>
        </div>
        <input type="file" class="create-action__file-input" accept="image/png, image/jpeg" @change="updateImg">
      </label>
    </div>
    <div class="text-write">
      <input type="text" class="create-action__title" placeholder="Title" v-model="title">
      <ActionEditor editor-id='editor' @text-changed="updateBody"/>
      <div class="btn-group">
        <button @click.prevent="createAction" class="btn">Create</button>
        <router-link :to="{ name: 'dashboard' }" class="btn">Cancel</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';

import { useNotifStore } from '../stores/notification';
import ActionEditor from '../components/Actions/ActionEditor.vue';
import Action from '../models/actions';

const { value: image, validate: vAvatar } = useField("avatar", "required");
const { value: title, validate: vTitle } = useField("title", "required");
const body = ref("");

const notifStore = useNotifStore();
const router = useRouter();
const img = ref(null);
const showUploadTxt = ref(true);


function updateImg(event) {
  image.value = event.target.files[0];
  img.value.src = URL.createObjectURL(event.target.files[0]);
  showUploadTxt.value = false;
}
function updateBody(text) {
  body.value = text;
}

async function createAction() {
  const { valid: isAvatarValid } = await vAvatar();
  const { valid: isTitleValid } = await vTitle();
  if (isAvatarValid && isTitleValid) {

    const formData = new FormData();
    formData.append("avatar", image.value);
    formData.append("title", title.value);
    formData.append("body", body.value);

    const action = new Action(formData);

    try {
      const created = await action.save();
      if (created) {
        notifStore.pushNotification("Action Created Successfully.")
        router.push({ name: "dashboard" });
      };
    } catch (err) {
      const message = err.response.data.message;
      notifStore.pushNotification(message);
    }

  } else {
    notifStore.pushNotification("Image and title is required.")
  }
}

</script>

<style lang="scss" scoped>
// @import "../assets/styles/base/variables";

// .create-action {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   min-height: 94vh;

//   .create-action__file-group {
//     position: relative;
//     border: dashed 2px $dark;
//     border-radius: 1rem;
//     overflow: hidden;

//     .create-action__upload-text {
//       color: $dark;
//       text-align: center;
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translateX(-50%) translateY(-50%);
//       width: 90%;
//     }

//     .create-action__image {
//       display: block;
//       margin: 0 auto;
//       aspect-ratio: 1;
//       width: 100%;
//       object-fit: cover;
//     }
//   }

//   .create-action__file-input {
//     display: none;
//   }

//   .create-action__title {
//     margin-top: 1rem;
//     width: 100%;
//     background: $light;
//     padding: 0.5rem;
//     text-align: center;

//     @media screen and (min-width: $md) {
//       margin-top: 0;
//     }
//   }

//   @media screen and (min-width: $md) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;

//     .image-select {
//       width: 30%;
//     }

//     .text-write {
//       width: 68%;
//     }
//   }
// }

// .btn-group {
//   margin-top: 0.5rem;
//   display: flex;
//   flex-direction: row;
//   align-items: stretch;
//   justify-content: flex-end;
//   gap: 0.3rem;

//   .btn {
//     background: $light;
//     padding: $p-xs $p-sm;
//     border-radius: 0.5rem;
//     color: $dark;
//   }
// }
</style>
