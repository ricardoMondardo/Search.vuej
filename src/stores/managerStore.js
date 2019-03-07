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
      Email: ""
    }
  },
  mutations: {
    logInUser (state) {
      state.user.logged = true
    },
    logOutUser (state) {
      state.user.logged = false
    }
  },
  plugins: [vuexLocalStorage.plugin]
}

export { storeObj }

