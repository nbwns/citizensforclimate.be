import Vuex from 'vuex'
import client from '~/plugins/contentful'

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
          client.getEntries({
                content_type: 'simplePage',
                'locale':"*",
                order: 'fields.sortOrder',
                'fields.sortOrder[gte]' : "1"
            })
            .then(entries => {
                console.log("from store",entries.items.length)
                commit('saveNavigationItems',entries.items)
            })
            .catch(console.error)
        }
      }
  })
}

export default createStore