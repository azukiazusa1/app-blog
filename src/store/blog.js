// import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const blogsRef = db.collection('blogs')

export const blog = {
  namespaced: true,
  state: {
    blogInfo: {}
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindBlogInfo: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('blog', blogsRef.doc('info'))
    }),
  },
  getters: {
    getBlogInfo(state) {
      return state.blogInfo
    }
  }
}