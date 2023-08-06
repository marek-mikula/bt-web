import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { User } from '~/types/http/Entities'

export default defineNuxtMiddleware(({ route, store, redirect }) => {
  const { path } = route

  if (!path.startsWith('/app') || path === '/app/quiz') {
    return
  }

  // user is not logged in
  if (!store.getters['auth/loggedIn']) {
    return redirect('/')
  }

  const user = store.getters['auth/user'] as any as User

  // redirect to quiz page
  if (!user.quizTaken) {
    return redirect('/app/quiz')
  }
})
