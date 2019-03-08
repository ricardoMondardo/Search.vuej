'use strict';

import VuexPersist from 'vuex-persist';

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const storeObj = {
  state: {
    user: {
      logged: false,
      Email: "",
      token: ""
    },
    UIControl: {
      showTopMenu: false
    }
  },
  mutations: {
    logInUser (state, token) {
      state.user.logged = true
      state.user.token = token
    },
    logOutUser (state) {
      state.user.logged = false
      state.user.token = ""
    },
    toogleTopMenu (state) {
      state.UIControl.showTopMenu = !state.UIControl.showTopMenu
    }
  },
  plugins: [vuexLocalStorage.plugin]
}

export { storeObj }

