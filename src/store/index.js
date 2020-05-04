import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules
})
