import { Context } from '@nuxt/types'
import Vue from 'vue'
import ToastComponent from '~/components/common/Toast.vue'
import { TOAST_TYPE } from '~/enums/common/ToastType'
import ToastArguments from '~/types/common/ToastArguments'

export default class Toast {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly context: Context) {}

  private spawn(
    type: TOAST_TYPE,
    args: ToastArguments
  ): typeof ToastComponent | void {
    const container = document.getElementById('toast-container')

    if (!container) {
      return
    }

    const Instance = Vue.extend(ToastComponent)

    return new Instance({
      el: container.appendChild(document.createElement('div')),
      propsData: {
        type,
        title: args.title,
        message: args.message,
        closable: args.closable,
        timeout: args.timeout,
        progress: args.progress,
        onRemove: args.onRemove
      }
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
