import { db } from '@/db'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
const archivesRef = db.collection('archives')

export const archives = {
  namespaced: true,
  state: {
    allowedMonths: [],
    archive: null
  },
  getters: {
    getAllowedMonths (state) {
      return state.allowedMonths
    },
    getArchive (state) {
      return state.archive
    }
  },
  mutations: {
    ...vuexfireMutations,
    add (state, payload) {
      state.allowedMonths.push(payload.id)
    }
  },
  actions: {
    fetchArchives ({ commit }) {
      archivesRef.get()
        .then(querySnapshot => {
          if (querySnapshot.empty) return
          querySnapshot.forEach(doc => {
            commit('add', { id: doc.id })
          })
        })
    },
    bindArchiveByMonth: firestoreAction(({ bindFirestoreRef }, month) => {
      return bindFirestoreRef('archive', archivesRef.doc(month))
    })
  }
}
