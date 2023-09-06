import { useRouter } from '@nuxtjs/composition-api'
import { RawLocation } from 'vue-router/types/router'

export function useRedirect() {
  const router = useRouter()

  async function redirect(to: RawLocation): Promise<void> {
    await router.push(to)
  }

  return {
    redirect
  }
}
