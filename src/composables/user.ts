import { useContext } from '@nuxtjs/composition-api'
import { User } from '~/types/http/entities/User'

export function useUser() {
  const { $auth } = useContext()

  function getUser(): User {
    if (!$auth.loggedIn) {
      throw new Error(
        'Cannot use useUser composable when user is not logged in!'
      )
    }

    return $auth.user as any as User
  }

  return {
    getUser
  }
}
