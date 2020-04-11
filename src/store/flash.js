export const flash = {
  namespaced: true,
  state: {
    message: '',
    type: '',
    appear: false
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getType(state) {
      return state.type
    },
    isAppear(state) {
      return state.appear
    }
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
    setType(state, payload) {
      state.type = payload
    },
    showFlash(state) {
      state.appear = true
    },
    hideFlash(state) {
      state.appear = false
    }
  },
  actions: {
    setFlash({ commit, dispatch}, { message = '', type = 'success', timeout = 3000}) {
      commit('setMessage', message)
      commit('setType', type)
      commit('showFlash')
      if (timeout) {
        setTimeout(() => {
          dispatch('destroyFlash')
        }, timeout)
      }
    },
    destroyFlash({ commit }) {
      commit('setMessage', '')
      commit('setType', '')
      commit('hideFlash')
    }
  }
}