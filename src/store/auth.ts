import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosResponse } from 'axios'
import { useContext } from '@nuxtjs/composition-api'
import { User } from '~/types/http/Entities'
import { JsonResponse } from '~/types/http/Responses'

export interface AuthState {
  user: User | null
  loggedIn: boolean | null // null = we haven't checked the user info yet
}

export const state = (): AuthState => ({
  user: null,
  loggedIn: null
})

export const getters: GetterTree<AuthState, AuthState> = {
  user: (state) => state.user,
  loggedIn: (state) => state.loggedIn
}

export const mutations: MutationTree<AuthState> = {
  setUser: (state, user: User | null): void => {
    state.user = user
  },

  setLoggedIn: (state, loggedIn: boolean): void => {
    state.loggedIn = loggedIn
  }
}

export const actions: ActionTree<AuthState, AuthState> = {
  // loads initial user data when the page first loads
  async nuxtServerInit(
    { dispatch },
    { $repositories, $axios, req }: Context
  ): Promise<void> {
    // set referrer so the sanctum middleware gets correctly
    // loaded on the API side
    if (process.server) {
      $axios.setHeader('referer', req.headers.host)
    }

    try {
      const user = await $repositories.auth
        .me()
        .then((response) => response.data.data.user)

      await dispatch('login', user)
    } catch (e: any) {
      const response: AxiosResponse<JsonResponse> = e.response

      // do not throw 401 (Unauthenticated)
      // because that just means the user is not
      // authenticated
      if (response.status !== 401) {
        throw e
      }

      await dispatch('clear')
    }
  },

  async fetchUser({ dispatch }): Promise<void> {
    const { $repositories } = useContext()

    const user = await $repositories.auth
      .me()
      .then((response) => response.data.data.user)

    await dispatch('login', user)
  },

  async login({ commit }, user: User): Promise<void> {
    await commit('setUser', user)
    await commit('setLoggedIn', true)
  },

  async clear({ commit }): Promise<void> {
    await commit('setUser', null)
    await commit('setLoggedIn', false)
  }
}
