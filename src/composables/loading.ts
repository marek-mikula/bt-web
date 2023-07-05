import { ref } from '@nuxtjs/composition-api'

export function useLoading() {
  const isLoading = ref<boolean>(false)

  /**
   * Changes the loading state
   */
  function setIsLoading(state: boolean): void {
    isLoading.value = state
  }

  return {
    isLoading,
    setIsLoading
  }
}
