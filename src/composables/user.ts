import { useContext } from '@nuxtjs/composition-api'
import UserEntity from '~/types/entities/UserEntity'

export function useUser() {
  const { $auth } = useContext()

  if (!$auth.loggedIn) {
    throw new Error('Cannot use useUser composable when user is not logged in!')
  }

  const user = $auth.user as any as UserEntity

  return {
    user
  }
}
