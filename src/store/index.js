import Vue from 'vue'
import Vuex from 'vuex'
import { flash } from './flash'
import { user } from './user'
import { tags } from './tags'
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
const articleRef = db.collection('articles')

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
    set(state, payload) {
      state.article = payload
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
    fetchArticles: (({ commit }, {lastDate = new Date('2999-12-31'), limit = 10, published = true}) => { 
      articleRef
        .where('published', '==', published)
        .orderBy('created', 'desc')
        .startAfter(lastDate)
        .limit(limit)
        .get()
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
      return bindFirestoreRef('article', articleRef.doc(id))
    }),
    bindAllArticles: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('allArticles', articleRef.where('published', '==', true))
    }),
    createArticle(context, uid) {
      return articleRef.add({
        title: '',
        body: '',
        published: false,
        author: uid,
        tags: [],
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    },
    updateArticle: firestoreAction(({ getters }, payload) => {
      const newData = {created: firebase.firestore.FieldValue.serverTimestamp(), ...payload}
      articleRef
        .doc(getters.getArticle.id)
        .update(newData)
    })
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
    user,
    tags
  }
})
