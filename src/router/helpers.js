import { useUserStore } from '../stores/users';


export function auth_required() {
  const userStore = useUserStore();
  if (!userStore.loggingIn) return { name: "auth" }
}

export function authenticated() {
  const userStore = useUserStore();
  if (userStore.token && userStore.username) return { name: "dashboard" };
}
