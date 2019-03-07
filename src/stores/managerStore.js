'use strict';

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
  }
}

export { storeObj }

