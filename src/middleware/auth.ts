import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ route, store, redirect }) => {
  const { path } = route

  const isGuestRoute = [
    '/',
    '/register',
    '/password-reset',
    '/mfa/password-reset',
    '/mfa/verify-email'
  ].includes(path)

  // route should be for guests only => check that user is not logged in
  if (isGuestRoute && !store.getters['auth/loggedIn']) {
    return
  } else if (isGuestRoute && store.getters['auth/loggedIn']) {
    return redirect('/app')
  }

  // route is for authenticated users only
  // => check that user is logged in

  if (store.getters['auth/loggedIn']) {
    return
  }

  return redirect('/')
})
