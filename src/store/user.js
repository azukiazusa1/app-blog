import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
const userRef = db.collection('users')

export const user = {
  namespaced: true,
  state: {
    user: {},
    loading: true,
    error: false
  },
  mutations: {
    ...vuexfireMutations,
    loaded(state) {
      state.loading = false
    },
    hasError(state) {
      state.error = true
    }
  },
  actions: {
    bindUserById: firestoreAction(({ bindFirestoreRef , commit}, id) => {
      bindFirestoreRef('user', userRef.doc(id))
        .then(() => commit('loaded'))
        .catch(() => commit('hasError'))
    }),
    updateUser: firestoreAction((context, payload) => {
      return userRef
        .doc(payload.id)
        .update(payload)
    }),
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getLoading(state) {
      return state.loading
    },
    getError(state) {
      return state.error
    }
  },
}
