import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import { ComputedRef } from 'vue/types/v3-generated'
import { User } from '~/types/http/Entities'
import { useRedirect } from '~/composables/redirect'

export function useUser() {
  const { $repositories, $toast, i18n } = useContext()
  const { redirect } = useRedirect()
  const store = useStore()

  function getUser(): ComputedRef<User> {
    if (!store.getters['auth/loggedIn']) {
      throw new Error(
        'Cannot use useUser composable when user is not logged in!'
      )
    }

    return computed<User>(() => store.getters['auth/user'] as any as User)
  }

  function getNullableUser(): ComputedRef<User | null> {
    return computed<User | null>(() =>
      store.getters['auth/loggedIn']
        ? (store.getters['auth/user'] as any as User)
        : null
    )
  }

  async function logout(
    withRequest: boolean = true,
    withMessage: boolean = true
  ): Promise<void> {
    if (withRequest) {
      await $repositories.auth.logout()
    }

    if (withMessage) {
      $toast.success({
        title: i18n.t('toasts.logout.success').toString()
      })
    }

    // clear data from store
    await store.dispatch('auth/clear')

    await redirect({ path: '/' })
  }

  return {
    getUser,
    getNullableUser,
    logout
  }
}
