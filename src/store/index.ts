import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'

export interface RootState {}

export const state = (): RootState => ({})

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, ctx: Context) {
    await dispatch('auth/nuxtServerInit', ctx)
  }
}
