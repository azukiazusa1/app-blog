// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const tagsRef = db.collection('tags')

export const tags = {
  namespaced: true,
  state: {
    tags: [],
    bindTags: [],
    tag: null
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
    bindTagByName: firestoreAction(({ bindFirestoreRef }, name) => {
      return bindFirestoreRef('tag', tagsRef.doc(name))
    }),
    createOrUpdateTag(context, payload) {
      tagsRef.doc(payload.name).set({
        name: payload.name,
        image: payload.image,
        description: payload.description
    })
    }
  },
  getters: {
    getTags(state) {
      return state.tags
    },
    getBindTags(state) {
      return state.bindTags
    },
    getTag(state) {
      return state.tag
    }
  }
}