import { useContext, useRouter } from '@nuxtjs/composition-api'
import { User } from '~/types/http/entities/User'

export function useUser() {
  const { $auth, $toast, i18n } = useContext()
  const router = useRouter()

  function getUser(): User {
    if (!$auth.loggedIn) {
      throw new Error(
        'Cannot use useUser composable when user is not logged in!'
      )
    }

    return $auth.user as any as User
  }

  async function logout(): Promise<void> {
    await $auth.logout()

    $toast.success({
      title: i18n.t('toasts.logout.success').toString()
    })

    await router.push({ path: '/' })
  }

  return {
    getUser,
    logout
  }
}
