import { useContext } from '@nuxtjs/composition-api'
import UserEntity from '~/types/entities/UserEntity'

export function useUser() {
  const { $auth } = useContext()

  const user = $auth.user as any as UserEntity

  return {
    user
  }
}
