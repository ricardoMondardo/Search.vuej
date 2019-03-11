'use strict';

import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const storeObj = {
  state: {
    user: {
      logged: false,
      Email: "",
      id: "",
      token: "",
      tokenExpirationTime: 0
    },
    UIControl: {
      showTopMenu: false
    }
  },
  mutations: {
    logInUser (state, payload) {
      state.user.logged = true

      state.user.id = payload.id
      state.user.token = payload.token
      state.user.tokenExpirationTime = payload.tokenExpirationTime
    },
    logOutUser (state) {
      state.user.logged = false
      state.user.token = ""
      state.user.id = ""
      state.user.tokenExpirationTime = 0
    },
    openTopMenu (state, value) {
      state.UIControl.showTopMenu = value
    }
  },
  plugins: [vuexLocalStorage.plugin]
}

export { storeObj }

