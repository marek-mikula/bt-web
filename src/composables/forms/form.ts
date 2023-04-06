import { ref } from '@nuxtjs/composition-api'

export function useForm() {
  const errors = ref([])

  function clearErrors() {
    errors.value = []
  }

  return {
    errors,
    clearErrors
  }
}
