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
    }
  },
  plugins: [vuexLocalStorage.plugin]
}

export { storeObj }

