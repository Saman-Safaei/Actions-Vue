import { ref, unref } from 'vue';

import api from '../api';
import { useUserStore } from '../stores/users';
import { useLocale } from './locale';

const endpoint = '/actions';

export function useEditAction(id, title, body, notifStore) {
  const token = useUserStore().token;
  const { t } = useLocale();
  const pending = ref(false);

  function put(cb, fcb) {
    pending.value = true;

    const titleVal = unref(title);
    const bodyVal = unref(body);
    const idVal = unref(id);

    console.log(idVal);

    const editedData = {
      title: titleVal,
      body: bodyVal,
      id: idVal,
    };

    api
      .put(endpoint, editedData, {
        headers: { 'Content-Type': 'application/json', token },
      })
      .then(res => {
        notifStore.pushNotification(t('texts.actionUpdated'));
        pending.value = false;
        cb(res);
      })
      .catch(err => {
        notifStore.pushNotification('An error occurred');
        pending.value = false;
        fcb(err);
      });
  }

  return { put, pending };
}
