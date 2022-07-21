import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/users';
import api from '../api';

const endpoint = '/actions';

export function useAllActions(router, userStore) {
  const token = useUserStore().token; // Get Token From LocalStorage

  const allActions = reactive([]);
  const error = reactive({});
  const loaded = ref(false);

  load();

  function load() {
    loaded.value = false;

    api
      .get(endpoint, { headers: { token: token } })
      .then(res => {
        allActions.length = 0;
        allActions.push(...res.data);
        loaded.value = true;
      })
      .catch(err => {
        if (err.response) {
          error.status = err.response.status;
          error.message = err.response.data?.message;
          error.message_code = err.response.data?.code;
          if (router && userStore && err.response.status === 401) {
            userStore.logOut();
            router.push({ name: 'auth' });
          }
        }
      });
  }

  return { data: allActions, error: error, loaded: loaded, load: load };
}
