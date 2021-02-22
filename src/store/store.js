import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
      items: [],
      item: {},
      itemVal: ''
  },
  mutations: {
      SET_ITEMS_TO_STATE: (state, items) => {
        // debugger;
          state.items = items;
          // state.item = items[0];
          state.itemVal = state.items.content.length;

      },
  },
  actions: {
      GET_ITEMS_FROM_API({commit}) {
          return axios('http://localhost:3000/items', {
              method: "GET"
          })
          .then((items) => {

            let randomIndex = Math.floor( Math.random() * items.data.length );
            let arr = items.data[randomIndex];

            commit('SET_ITEMS_TO_STATE', arr);

          })
          .catch((error) => {
              console.error(error);
              return error;
          })
      },
  },
  getters: {
    ITEMS(state) {
        return state.items;
    },

    // ITEM(state) {
    //     return state.item;
    // },

    ITEM_VAL(state) {
        return state.itemVal;
    }
    // randomItem: state => {
    //     let randomIndex = Math.floor( Math.random() * state.items.length );
    //     return state.items.filter((el, index) => {
    //         return index === randomIndex;
    //     })
    // },
    // randomItemByIndex: state => {
        // let randomIndex = Math.floor( Math.random() * state.items.length );
            // return state.items.find((el, index) => {
            //     return index === randomIndex;
            // })
    // }
  },
});

export default store;
