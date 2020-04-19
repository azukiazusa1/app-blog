// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const tagsRef = db.collection('tags')

export const tags = {
  namespaced: true,
  state: {
    tags: [],
    bindTags: [],
  },
  mutations: {
    ...vuexfireMutations,
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
    bindTags: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('bindTags', tagsRef)
    }),
    createOrUpdateTag(context, payload) {
      tagsRef.doc(payload).set({name: payload})
    }
  },
  getters: {
    getTags(state) {
      return state.tags
    },
    getBindTags(state) {
      return state.bindTags
    }
  }
}