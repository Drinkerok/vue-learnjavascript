import Vue from "vue";
import Vuex from "vuex";
import loader from "@/utils/backend.js";
import { API } from "@/utils/constants.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    userName: "User",
    users: [],
    usersLoaded: false
  },
  getters: {
    getUserById: state => id => {
      return state.users.find(user => user.id === id);
    }
  },
  mutations: {
    changeName(state, { name }) {
      state.userName = name;
    },
    saveUsers(state, { users }) {
      state.users = [...users];
    },
    changeLoadedStatus(state, { status }) {
      state.usersLoaded = status;
    }
  },
  actions: {
    loadUsers({ state, commit }) {
      if (state.usersLoaded) {
        return;
      }

      loader(API.users)
        .then(data => {
          commit({
            type: "saveUsers",
            users: data
          });
        })
        .catch(err => alert(err.message));
    },
    deleteUser({ state, commit }, { id }) {
      loader(`${API.users}/${id}`, {
        method: "DELETE"
      })
        .then(() => {
          commit({
            type: "saveUsers",
            users: state.users.filter(user => user.id !== id)
          });
        })
        .catch(err => alert(err.message));
    },
    addUser({ commit, dispatch }, { user }) {
      loader(API.users, {
        data: user,
        method: "POST"
      })
        .then(() => {
          commit({
            type: "changeLoadedStatus",
            status: false
          });
          return dispatch("loadUsers");
        })
        .catch(err => alert(err.message));
    },
    editUser({ state, commit }, { user }) {
      return loader(`${API.users}/${user.id}`, {
        data: user,
        method: "PUT"
      })
        .then(() => {
          commit({
            type: "saveUsers",
            users: state.users.map(userInStore => {
              if (userInStore.id !== user.id) {
                return userInStore;
              } else {
                return { ...user };
              }
            })
          });
        })
        .catch(err => alert(err.message));
    }
  }
});

export default store;
