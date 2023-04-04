import { createStore } from 'vuex';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default createStore({
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://laravel-study-vue-api-jwt.test/api/v1/auth/login', credentials)
        //console.log(response);
        const token = response.data.token
        const user = jwt_decode(token)
        commit('setToken', token)
        commit('setUser', user)
        localStorage.setItem('token', token)
        return user
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('http://laravel-study-vue-api-jwt.test/api/v1/auth/register', userData)
        //console.log(response);
        const token = response.data.token
        const user = jwt_decode(token)
        commit('setToken', token)
        commit('setUser', user)
        localStorage.setItem('token', token)
        return user
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    logout({ commit }) {
      commit('setToken', null)
      commit('setUser', null)
      localStorage.removeItem('token')
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const user = jwt_decode(token)
      commit('setToken', token)
      commit('setUser', user)
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null
    }
  }
})
