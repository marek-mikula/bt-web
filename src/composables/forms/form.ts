import {
  computed,
  reactive,
  ref,
  UnwrapNestedRefs,
  useContext
} from '@nuxtjs/composition-api'
import { LoDashStatic } from 'lodash'
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
  constructor(
    private readonly $_: LoDashStatic,
    private readonly defaultData: T
  ) {
    this.data = reactive<T>(this.$_.cloneDeep<T>(this.defaultData))
  }

  public reset(
    key: string | null = null,
    omit: string | string[] | null = null,
    pick: string | string[] | null = null
  ): void {
    // clone default data object
    let defaultData: T | Partial<T> = this.$_.cloneDeep(this.defaultData)

    // get specific key if any
    if (key) {
      defaultData = this.$_.get(defaultData, key)
    }

    // filter out unwanted keys if any
    if (omit) {
      defaultData = this.$_.omit(defaultData, omit)
    }

    if (pick) {
      defaultData = this.$_.pick(defaultData, pick)
    }

    if (key) {
      this.$_.assign(this.$_.get(this.data, key), defaultData)
    } else {
      this.$_.assign(this.data, defaultData)
    }
  }
}

export function useFormData() {
  const { $_ } = useContext()

  function createForm<T extends object>(defaultData: T) {
    return new Form<T>($_, defaultData)
  }

  return {
    createForm
  }
}
