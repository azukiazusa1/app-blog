import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const articlesRef = db.collection('articles')

export const relArticles = {
  namespaced: true,
  state: {
    relArticles: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindRelArticles: firestoreAction(({ bindFirestoreRef }, articleId) => {
      return bindFirestoreRef('relArticles', articlesRef.doc(articleId).collection('relArticles'))
    }),
    addRelArticle (context, { articleId, relArticle }) {
      const articleDoc = articlesRef.doc(articleId)
      articleDoc
        .collection('relArticles')
        .doc(relArticle.id)
        .set({
          title: relArticle.title,
          created: relArticle.created,
          thumbnail: relArticle.thumbnail
        })
    },
    removeRelArticle (context, { articleId, relArticle }) {
      const articleDoc = articlesRef.doc(articleId)
      articleDoc
        .collection('relArticles')
        .doc(relArticle.id)
        .delete()
    }
  },
  getters: {
    getRelArticles (state) {
      return state.relArticles
    }
  }
}
