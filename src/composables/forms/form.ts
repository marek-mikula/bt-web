import { computed, ref, useContext } from '@nuxtjs/composition-api'
import InvalidContentResponse from '~/types/http/responses/InvalidContentResponse'

export function useForm() {
  const { $_ } = useContext()

  const fieldErrors = ref<{ [key: string]: string[] }>({})

  const errors = computed<string[]>((): string[] => {
    return $_.uniq(Object.values(fieldErrors.value).flat())
  })

  /**
   * Clear all form errors. This is usually
   * called when making a new form request.
   */
  function clearErrors(): void {
    fieldErrors.value = {}
  }

  /**
   * Gets first error only for specific input.
   */
  function fieldError(name: string): string | null {
    return $_.get(fieldErrors.value, name, [])[0] ?? null
  }

  /**
   * Parses errors from given response.
   */
  function parseErrors(response: InvalidContentResponse): void {
    fieldErrors.value = response.data.errors
  }

  return {
    errors,
    fieldErrors,
    fieldError,
    clearErrors,
    parseErrors
  }
}
