import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ route, redirect }) => {
  const { path } = route

  if (path === '/app/settings') {
    return redirect('/app/settings/account')
  }
})
