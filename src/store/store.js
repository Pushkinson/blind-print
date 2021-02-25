import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// Хранилище состояний клиентского приложения

// Postman - проверка серверных данных

let store = new Vuex.Store({
  state: {
      items: [],
      item: {},
      itemVal: ''
  },
  mutations: {
      SET_ITEMS_TO_STATE: (state, items) => {
          state.items = items;

      },
  },
  actions: {
      GET_ITEMS_FROM_API({commit}) {
          return axios('http://localhost:3000/items', {
              method: "GET"
          })
          .then((items) => {

            const randomIndex = Math.floor(Math.random() * items.data.length);
            const arr = items.data[randomIndex];

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
  },
});

export default store;
