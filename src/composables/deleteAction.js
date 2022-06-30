import { useUserStore } from "../stores/users";
import api from "../api";
import { ref } from "vue";


const endpoint = '/actions';

export function useDeleteAction(reloadFn) {

  const userStore = useUserStore();
  const token = userStore.token;
  const pending = ref(false);
  const error = ref(null);

  function deleteAction(id) {
    pending.value = true;
    error.value = null;

    api.delete(endpoint, { data: { id }, headers: { token } })
      .then(_ => {
        pending.value = false;
        if (reloadFn) reloadFn();
      })
      .catch(err => { error.value = err; });
  }

  return { deleteAction, error, pending };

}
