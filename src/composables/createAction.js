import { ref, reactive, isRef, unref } from "vue";

import api from "../api";
import { useUserStore } from "../stores/users";


const endpoint = '/actions';

export function useCreateAction(img, title, body, notifStore) {
  const token = useUserStore().token;

  const pending = ref(false);

  function post(cb, fcb) {
    pending.value = true;

    const imgVal = unref(img);
    const titleVal = unref(title);
    const bodyVal = unref(body);


    const formData = new FormData();
    formData.append("avatar", imgVal);
    formData.append("title", titleVal);
    formData.append("body", bodyVal);

    api.post(endpoint, formData, { headers: { "Content-Type": "multipart/form-data", token } })
      .then(res => {
        notifStore.pushNotification("Action Created");
        pending.value = false;
        cb(res);
      })
      .catch(err => {
        notifStore.pushNotification("An error occurred");
        pending.value = false;
        fcb(err);
      });
  }

  return {post, pending};
}
