import { reactive, ref, useContext } from '@nuxtjs/composition-api'
import { StringMap } from '~/types/common/Common'

export function useLoading(defaultState = false) {
  const isLoading = ref<boolean>(defaultState)

  function setIsLoading(state: boolean): void {
    isLoading.value = state
  }

  return {
    isLoading,
    setIsLoading
  }
}

export function useDomainLoading<T extends StringMap<boolean>>(
  defaultState: T
) {
  const { $_ } = useContext()
  const isLoading = reactive<T>(defaultState)

  function setIsLoading(domain: keyof T, state: boolean): void {
    $_.set(isLoading, domain, state)
  }

  return {
    isLoading,
    setIsLoading
  }
}
