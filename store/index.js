import Vuex from 'vuex'
//import client from '~/plugins/contentful'
const client = require('~/plugins/contentful')

const createStore = () => {
  return new Vuex.Store({
    state: {
      navigationItems: [],
      activePage: ''
    },
    mutations: {
      saveNavigationItems (state, items) {
        state.navigationItems = items
      },
      setActivePage (state, page) {
        state.activePage = page
      }
    },
    actions: {
        setActivePage({commit}, page){
            commit('setActivePage', page)
        },
        nuxtServerInit ({ commit }) {
          
        }
      }
  })
}

export default createStore