import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'

export interface NotificationState {
  unread: number
  firstLoad: boolean
}

export const state = (): NotificationState => ({
  unread: 0,
  firstLoad: true
})

export const getters: GetterTree<NotificationState, NotificationState> = {
  unread: (state): number => state.unread
}

export const mutations: MutationTree<NotificationState> = {
  setUnread: (state, count: number): void => {
    state.unread = count
  },

  increment: (state): void => {
    state.unread += 1
  },

  decrement: (state): void => {
    state.unread = state.unread > 0 ? state.unread - 1 : 0
  },

  setFirstLoad: (state, val: boolean) => {
    state.firstLoad = val
  }
}

export const actions: ActionTree<NotificationState, NotificationState> = {
  async fetchUnreadNotifications(
    { commit, state },
    { $repositories, $toast, i18n }: Context
  ): Promise<void> {
    try {
      const count = await $repositories.userNotification
        .unread()
        .then((response) => response.data.data.count)

      // save original count
      const originalCount = state.unread

      // set new count
      await commit('setUnread', count)

      // show toasts message when user receives new notifications
      // but only if it's not an initial load
      if (!state.firstLoad && originalCount < count) {
        $toast.info({
          title: i18n.t('toasts.common.newNotifications').toString()
        })
      }

      // change the value of first load if this
      // was the initial load
      if (state.firstLoad) {
        await commit('setFirstLoad', false)
      }
    } catch (e) {
      await commit('setUnread', 0)
    }
  }
}
