import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { useContext } from '@nuxtjs/composition-api'

export interface NotificationState {
  unreadNotifications: number
}

export const state = (): NotificationState => ({
  unreadNotifications: 0
})

export const getters: GetterTree<NotificationState, NotificationState> = {
  unreadNotifications: (state) => state.unreadNotifications
}

export const mutations: MutationTree<NotificationState> = {
  setUnreadNotifications: (state, count: number): void => {
    state.unreadNotifications = count
  },

  increment: (state): void => {
    state.unreadNotifications += 1
  },

  decrement: (state): void => {
    state.unreadNotifications =
      state.unreadNotifications > 0 ? state.unreadNotifications - 1 : 0
  }
}

export const actions: ActionTree<NotificationState, NotificationState> = {
  async fetchUnreadNotifications({ commit }): Promise<void> {
    const { $repositories } = useContext()

    try {
      const count = await $repositories.userNotification
        .unread()
        .then((response) => response.data.data.count)

      commit('setUnreadNotifications', count)
    } catch (e) {
      commit('setUnreadNotifications', 0)
    }
  }
}
