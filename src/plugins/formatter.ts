import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export class Formatter {
  private formatters: { [key: string]: ReturnType<typeof Intl.NumberFormat> } =
    {}

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly ctx: Context) {}

  public formatCurrency(value: number, currency: string): string {
    return this.getFormatter(currency).format(value)
  }

  private getFormatter(currency: string): ReturnType<typeof Intl.NumberFormat> {
    if (!(currency in this.formatters)) {
      this.formatters[currency] = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      })
    }

    return this.formatters[currency]
  }
}

export default defineNuxtPlugin((ctx: Context, inject: Inject): void => {
  inject('formatter', new Formatter(ctx))
})
