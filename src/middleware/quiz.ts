import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { User } from '~/types/http/Entities'

export default defineNuxtPlugin(({ route, $auth, redirect }) => {
  const { path } = route

  if (!path.startsWith('/app') || path === '/app/quiz') {
    return
  }

  // user is not logged in
  if (!$auth.loggedIn) {
    return redirect('/')
  }

  const user = $auth.user as any as User

  // redirect to quiz page
  if (!user.quizTaken) {
    return redirect('/app/quiz')
  }
})
