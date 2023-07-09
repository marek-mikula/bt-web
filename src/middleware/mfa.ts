import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ route, redirect }) => {
  const token = route.query.token as string | null

  // redirect to login page
  if (!token) {
    return redirect('/')
  }
})
