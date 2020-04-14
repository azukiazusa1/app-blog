import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

export const user = {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindUserById: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef('user', db.collection('users').doc(id))
    }),
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
}
