import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
const userRef = db.collection('users')

export const user = {
  namespaced: true,
  state: {
    user: {},
    users: [],
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
    bindUsers: firestoreAction(({ bindFirestoreRef}) => {
      return bindFirestoreRef('users', userRef)
    }),
    bindUserById: firestoreAction(({ bindFirestoreRef}, id) => {
      return bindFirestoreRef('user', userRef.doc(id))
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
    getUsers(state) {
      return state.users
    },
    getLoading(state) {
      return state.loading
    },
    getError(state) {
      return state.error
    }
  },
}
