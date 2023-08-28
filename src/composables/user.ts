import {
  computed,
  useContext,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'
import { ComputedRef } from 'vue/types/v3-generated'
import { User } from '~/types/http/Entities'

export function useUser() {
  const { $repositories, $toast, i18n } = useContext()
  const router = useRouter()
  const store = useStore()

  function getUser(): ComputedRef<User> {
    if (!store.getters['auth/loggedIn']) {
      throw new Error(
        'Cannot use useUser composable when user is not logged in!'
      )
    }

    return computed<User>(() => store.getters['auth/user'] as any as User)
  }

  async function logout(): Promise<void> {
    await $repositories.auth.logout()

    $toast.success({
      title: i18n.t('toasts.logout.success').toString()
    })

    // clear data from store
    await store.dispatch('auth/clear')

    await router.push({ path: '/' })
  }

  return {
    getUser,
    logout
  }
}
