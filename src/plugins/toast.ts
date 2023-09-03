import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import Vue from 'vue'
import { TOAST_TYPE } from '~/enums/common/ToastType'
import { ToastArguments } from '~/types/common/Toast'
import ToastComponent from '~/components/common/Toast.vue'

export class Toast {
  private readonly containerId: string = 'toast-container'

  constructor(private readonly ctx: Context) {
    this.injectToastContainer()
  }

  private injectToastContainer(): void {
    const CONTAINER_OUTER_CLASSES = [
      'pointer-events-none',
      'fixed',
      'inset-0',
      'flex',
      'items-end',
      'px-4',
      'py-6',
      'sm:p-6'
    ]

    const CONTAINER_INNER_CLASS = [
      'flex',
      'w-full',
      'flex-col',
      'items-center',
      'space-y-2',
      'sm:items-end'
    ]

    const containerOuter = document.createElement('div')
    containerOuter.setAttribute('aria-live', 'assertive')
    containerOuter.classList.add(...CONTAINER_OUTER_CLASSES)

    const containerInner = document.createElement('div')
    containerInner.classList.add(...CONTAINER_INNER_CLASS)
    containerInner.setAttribute('id', this.containerId)

    containerOuter.appendChild(containerInner)

    document.body.appendChild(containerOuter)
  }

  private spawn(type: TOAST_TYPE, args: ToastArguments): typeof ToastComponent {
    const container = document.getElementById(this.containerId)

    if (!container) {
      throw new Error('No container element found for Toast message.')
    }

    const Instance = Vue.extend(ToastComponent)

    const { i18n } = this.ctx

    return new Instance({
      el: container.appendChild(document.createElement('div')),
      propsData: {
        type,
        ...args
      },
      i18n
    })
  }

  public success(args: ToastArguments): typeof ToastComponent | void {
    return this.spawn(TOAST_TYPE.SUCCESS, args)
  }

  public error(args: ToastArguments): typeof ToastComponent | void {
    return this.spawn(TOAST_TYPE.ERROR, args)
  }

  public warning(args: ToastArguments): typeof ToastComponent | void {
    return this.spawn(TOAST_TYPE.WARNING, args)
  }

  public info(args: ToastArguments): typeof ToastComponent | void {
    return this.spawn(TOAST_TYPE.INFO, args)
  }
}

export default defineNuxtPlugin((ctx: Context, inject: Inject): void => {
  inject('toast', new Toast(ctx))
})
