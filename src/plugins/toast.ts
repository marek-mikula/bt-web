import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import Toast from '~/toast/Toast'

const CONTAINER_OUTER_CLASS =
  'pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6'
const CONTAINER_INNER_CLASS =
  'flex w-full flex-col items-center space-y-2 sm:items-end'

const injectToastContainer = (): void => {
  const containerOuter = document.createElement('div')
  containerOuter.setAttribute('aria-live', 'assertive')
  containerOuter.classList.add(...CONTAINER_OUTER_CLASS.split(' '))

  const containerInner = document.createElement('div')
  containerInner.classList.add(...CONTAINER_INNER_CLASS.split(' '))
  containerInner.setAttribute('id', 'toast-container')

  containerOuter.appendChild(containerInner)

  document.body.appendChild(containerOuter)
}

const toastPlugin: any = (ctx: Context, inject: Inject): void => {
  injectToastContainer()
  inject('toast', new Toast(ctx))
}

export default toastPlugin
