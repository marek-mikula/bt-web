import { useContext } from '@nuxtjs/composition-api'
import { User } from '~/types/http/entities/User'

export function useUser() {
  const { $auth } = useContext()

  if (!$auth.loggedIn) {
    throw new Error('Cannot use useUser composable when user is not logged in!')
  }

  const user = $auth.user as any as User

  return {
    user
  }
}
