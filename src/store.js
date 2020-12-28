import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      Axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return Axios.post('//localhost:3000/register', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    }
  }
})
