import { ref } from '@nuxtjs/composition-api'

export function useLoading(defaultState = false) {
  const isLoading = ref<boolean>(defaultState)

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
