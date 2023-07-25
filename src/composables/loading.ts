import {
  reactive,
  ref,
  Ref,
  UnwrapNestedRefs,
  useContext
} from '@nuxtjs/composition-api'
import { StringMap } from '~/types/common/Common'

export function useLoading(defaultState = false): {
  isLoading: Ref<boolean>
  setIsLoading: (state: boolean) => void
} {
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
): {
  isLoading: UnwrapNestedRefs<T>
  setIsLoading: (state: boolean, domain: keyof T) => void
} {
  const { $_ } = useContext()
  const isLoading = reactive<T>(defaultState)

  function setIsLoading(state: boolean, domain: keyof T): void {
    $_.set(isLoading, domain, state)
  }

  return {
    isLoading,
    setIsLoading
  }
}
