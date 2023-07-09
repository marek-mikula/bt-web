import { Context } from '@nuxt/types'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((ctx: Context): void => {
  ctx.$axios.onRequest((config) => {
    const { $cookies, $repositories } = ctx

    const method = (config.method || '').toUpperCase()

    // fetch csrf token if needed
    if (
      ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) &&
      !$cookies.get('XSRF-TOKEN') &&
      !config.doNotCheckCsrf
    ) {
      return $repositories.auth.csrf().then(() => config)
    }

    return config
  })

  // eslint-disable-next-line
  ctx.$axios.onResponse((response) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onError((err) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onRequestError((err) => {
    // todo
  })

  // eslint-disable-next-line
  ctx.$axios.onResponseError((err) => {
    // todo
  })
})
