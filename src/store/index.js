import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindArticles: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('articles', db.collection('articles'))
    }),
  },
  getters: {
    getArticles(state) {
      return state.articles
    }
  }
})
