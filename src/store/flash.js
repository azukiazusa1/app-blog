const FLASH_TYPE = new Set(['success', 'error', 'warning', 'info'])

export const flash = {
  namespaced: true,
  state: {
    message: '',
    type: '',
    color: '',
    icon: '',
    appear: false,
    escape: false
  },
  getters: {
    getMessage(state) {
      return state.message
    },
    getType(state) {
      return state.type
    },
    getColor(state) {
      return state.color
    },
    getIcon(state) {
      return state.icon
    },
    isAppear(state) {
      return state.appear
    },
    escape(state) {
      return state.escape
    }
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
    setType(state, payload) {
      if (!FLASH_TYPE.has(payload)) throw new Error('存在しないタイプです。')
      state.type = payload
    },
    setColor(state, payload) {
      state.color = payload
    },
    setIcon(state, payload) {
      state.icon = payload
    },
    showFlash(state) {
      state.appear = true
    },
    hideFlash(state) {
      state.appear = false
    },
    setEscape(state, payload) {
      state.escape = payload
    }
  },
  actions: {
    setFlash({ commit, dispatch }, {
       message = '', 
       type = 'success',
       color = '',
       icon = null,
       timeout = 3000, 
       escape = true,
       mounted = () => {},
       destroyed = () => {}
    }) {
      commit('setMessage', message)
      commit('setType', type)
      commit('setColor', color)
      commit('setIcon', icon)
      commit('setEscape', escape)
      commit('showFlash')
      mounted()
      if (timeout) {
        setTimeout(() => {
          dispatch('destroyFlash')
          destroyed()
        }, timeout)
      }
    },
    destroyFlash({ commit }) {
      commit('setMessage', '')
      commit('hideFlash')
    }
  }
}