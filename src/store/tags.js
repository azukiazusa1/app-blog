// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
const tagsRef = db.collection('tags')

export const tags = {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    add(state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    fetchTags({ commit }) {
      tagsRef
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              commit('add', doc.id)
            })
          }
        })
    },
    createOrUpdateTag(context, payload) {
      tagsRef.doc(payload).set({name: payload})
    }
  },
  getters: {
    getTags(state) {
      return state.tags
    }
  }
}