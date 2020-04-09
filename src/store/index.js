import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    article: '',
    articles: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindArticles: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('articles', db.collection('articles'))
    }),
    bindArticleById: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef('article', db.collection('articles').doc(id))
    }),
  },
  getters: {
    getArticles(state) {
      return state.articles
    },
    getArticle(state) {
      return state.article
    },
    getArticleById:(state) => (id) => {
      return state.articles.find(article => article.id === id)
    }
  }
})
