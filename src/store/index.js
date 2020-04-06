import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
// import { db } from '@/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
  },
  modules: {
  }
})
