import Vue from 'vue'
import Vuex from 'vuex'
import { flash } from './flash'
import { user } from './user'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    article: '',
    lastDate: '',
    finish: false,
    articles: [],
    allArticles: ''
  },
  mutations: {
    ...vuexfireMutations,
    add(state, payload) {
      state.articles.push(payload)
    },
    last(state, payload) {
      state.lastDate = payload
    },
    finish(state) {
      state.finish = true
    },
    clearArticles(state) {
      state.articles = []
      state.lastDate = ''
      state.finish = false
    }
  },
  actions: {
    fetchArticles: (({ commit }, lastDate = new Date('2999-12-31')) => { 
      db.collection('articles')
        .orderBy('created', 'desc')
        .startAfter(lastDate)
        .limit(5).get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            commit('finish')
          } else {
            commit('last', new Date(querySnapshot.docs[querySnapshot.docs.length-1].data().created.seconds * 1000))
            querySnapshot.forEach(doc => {
              commit('add', {id: doc.id, ...doc.data()})
            })
          }
        })
    }),
    bindArticleById: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef('article', db.collection('articles').doc(id))
    }),
    bindAllArticles: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('allArticles', db.collection('articles'))
    }),
    addArticle(context, uid) {
      return db.collection('articles').add({
        title: '',
        body: '',
        published: false,
        author: uid,
        tags: []
      })
    }
  },
  getters: {
    getArticles(state) {
      return state.articles
    },
    getLastDate(state) {
      return state.lastDate
    },
    isFinish(state) {
      return state.finish
    },
    getArticle(state) {
      return state.article
    },
    getArticleById:(state) => (id) => {
      return state.articles.find(article => article.id === id)
    },
    getAllArticles(state) {
      return state.allArticles
    },
    getArticlesCount(state) {
      return state.allArticles.length
    }
  },
  modules: {
    flash,
    user
  }
})
