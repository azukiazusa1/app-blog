// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const blogsRef = db.collection('blogs')

export const blog = {
  namespaced: true,
  state: {
    blogInfo: {
      title: 'わたしのテックブログ'
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindBlogInfo: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('blogInfo', blogsRef.doc('info'))
    }),
    updateBlogInfo: firestoreAction((context, payload) => {
      return blogsRef
        .doc('info')
        .update(payload)
    })
  },
  getters: {
    getBlogInfo (state) {
      return state.blogInfo
    }
  }
}
