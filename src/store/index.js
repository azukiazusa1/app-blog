import Vue from 'vue'
import Vuex from 'vuex'
import { flash } from './flash'
import { user } from './user'
import { tags } from './tags'
import { blog } from './blog'
import { archives } from './archives'
import { relArticles } from './relArticles'
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
const articleRef = db.collection('articles')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    article: '',
    last: '',
    finish: false,
    articles: [],
    allArticles: [],
    drafts: []
  },
  mutations: {
    ...vuexfireMutations,
    add (state, payload) {
      state.articles.push(payload)
    },
    set (state, payload) {
      state.article = payload
    },
    last (state, payload) {
      state.last = payload
    },
    finish (state) {
      state.finish = true
    },
    clearArticles (state) {
      state.articles = []
      state.last = ''
      state.finish = false
    }
  },
  actions: {
    fetchArticles: ({ commit, getters }, {
      limit = 10,
      published = true,
      tag = false,
      month = false
    }) => {
      let query
      if (tag) {
        query = articleRef
          .where('published', '==', published)
          .where('tags', 'array-contains', tag)
      } else if (month) {
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
        query = articleRef
          .where('published', '==', published)
          .where('created', '>=', month)
          .where('created', '<=', endOfMonth)
      } else {
        query = articleRef
          .where('published', '==', published)
      }
      query
        .orderBy('created', 'desc')
        .startAfter(getters.getLast)
        .limit(limit)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            commit('finish')
          } else {
            if (querySnapshot.size < limit) commit('finish')
            commit('last', querySnapshot.docs[querySnapshot.docs.length - 1])
            querySnapshot.forEach(doc => {
              commit('add', { id: doc.id, ...doc.data() })
            })
          }
        })
    },
    bindArticleById: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef('article', articleRef.doc(id))
    }),
    bindAllArticles: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('allArticles', articleRef.where('published', '==', true).orderBy('created', 'desc'))
    }),
    bindArticlesByAuthor: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef('allArticles', articleRef
        .where('published', '==', true)
        .where('author', '==', uid)
        .orderBy('created', 'desc'))
    }),
    bindDrafts: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef('drafts', articleRef
        .where('published', '==', false)
        .where('author', '==', uid)
        .orderBy('created', 'desc')
      )
    }),
    createArticle (context, uid) {
      return articleRef.add({
        title: '',
        body: '',
        overview: '',
        published: false,
        author: uid,
        tags: [],
        created: firebase.firestore.FieldValue.serverTimestamp(),
        thumbnail: ''
      })
    },
    updateArticle: firestoreAction(({ getters }, payload) => {
      const newData = { ...payload }
      return articleRef
        .doc(getters.getArticle.id)
        .update(newData)
    }, { merge: true }),
    deleteArticle (context, id) {
      return articleRef.doc(id).delete()
    }
  },
  getters: {
    getArticles (state) {
      return state.articles
    },
    getLast (state) {
      return state.last
    },
    isFinish (state) {
      return state.finish
    },
    getArticle (state) {
      return state.article
    },
    getArticleById: (state) => (id) => {
      return state.articles.find(article => article.id === id)
    },
    getAllArticles (state) {
      return state.allArticles
    },
    getArticlesCount (state) {
      return state.allArticles.length
    },
    getDrafts (state) {
      return state.drafts
    },
    getDraftsCount (state) {
      return state.drafts.length
    }
  },
  modules: {
    flash,
    user,
    tags,
    blog,
    archives,
    relArticles
  }
})
