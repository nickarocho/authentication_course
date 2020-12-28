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
      // set user state
      state.user = userData
      // store a copy of the user state in local storage (for refreshes)
      localStorage.setItem('user', JSON.stringify(userData))
      // extract the token and add it to the header of every Axios call
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
    },
    login ({ commit }, credentials) {
      return Axios.post('//localhost:3000/login', credentials).then(
        ({ data }) => {
          commit('SET_USER_DATA', data)
        }
      )
    }
  }
})
