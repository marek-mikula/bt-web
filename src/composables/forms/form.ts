import {
  computed,
  reactive,
  ref,
  UnwrapNestedRefs,
  useContext
} from '@nuxtjs/composition-api'
import { StringMap } from '~/types/common/Common'
import { InvalidContentResponse } from '~/types/http/Responses'

export function useForm() {
  const { $_ } = useContext()

  const fieldErrors = ref<StringMap<string[]>>({})

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

export function useDomainForm<T extends string[]>(domains: T) {
  const { $_ } = useContext()

  type d = (typeof domains)[number]

  type fe = { [key in d]: StringMap<string[]> }

  const fieldErrors = ref<fe>(
    domains.reduce((o, v) => ({ ...o, [v]: {} }), {} as fe)
  )

  type e = { [key in d]: string[] }

  const errors = computed<e>(() => {
    return $_.transform(
      fieldErrors.value,
      (r, v, k: d) => {
        r[k] = $_.uniq(Object.values(v).flat()) as string[]
      },
      {} as e
    )
  })

  /**
   * Clear all form errors. This is usually
   * called when making a new form request.
   */
  function clearErrors(domain: d): void {
    fieldErrors.value[domain] = {}
  }

  /**
   * Gets first error only for specific input.
   */
  function fieldError(domain: d, name: string): string | null {
    return $_.get(fieldErrors.value[domain], name, [])[0] ?? null
  }

  /**
   * Parses errors from given response.
   */
  function parseErrors(domain: d, response: InvalidContentResponse): void {
    fieldErrors.value[domain] = response.data.errors
  }

  return {
    errors,
    fieldErrors,
    fieldError,
    clearErrors,
    parseErrors
  }
}

class Form<T extends object> {
  public data: UnwrapNestedRefs<T>

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly f: T) {
    this.data = reactive<T>({ ...f })
  }

  public clear(): void {
    Object.assign(this.data, this.f)
  }
}

export function useFormData() {
  function createForm<T extends object>(form: T) {
    return new Form(form)
  }

  return {
    createForm
  }
}
