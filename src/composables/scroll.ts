import { Ref } from '@nuxtjs/composition-api'

export function useInfiniteScroll(
  element: Ref<HTMLElement | null>,
  handler: () => Promise<void>
) {
  async function handle(): Promise<void> {
    if (!element.value) {
      return
    }

    if (
      element.value.scrollTop + element.value.clientHeight >=
      element.value.scrollHeight
    ) {
      await handler()
    }
  }

  function initInfiniteScroll(): void {
    element.value?.addEventListener('scroll', handle)
  }

  function destroyInfiniteScroll(): void {
    element.value?.removeEventListener('scroll', handle)
  }

  return {
    initInfiniteScroll,
    destroyInfiniteScroll
  }
}
