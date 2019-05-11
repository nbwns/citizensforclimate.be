import Vuex from 'vuex'
//import client from '~/plugins/contentful'
const client = require('~/plugins/contentful')

const createStore = () => {
  return new Vuex.Store({
    state: {
      actions: []
    },
    mutations: {
      setActions(state,items){
        state.actions = items
      }
    },
    actions: {
      fetchActions({commit}, params){
      console.log("fetch actions in store")  

            return client
            .getEntries({
              content_type: "action",
              locale: params.locale + "-BE",
              order: "fields.sortOrder,fields.name"
            })
            .then(entries => {
              commit('setActions',entries.items)
            });
        }
      }
  })
}

export default createStore