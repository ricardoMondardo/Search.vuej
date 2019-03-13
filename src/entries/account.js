import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/mo_account'
import CommonComponents from '../components/00_common'

import { storeObj } from '../stores/managerStore'
import { autoLogoutUser } from '../util/auto-logout-user'

import AddConstants from '../plugins/addConstants'
import Constants from '../util/constants'

// Stylesheet
import '../styles/main.scss'

// Global Components Common
CommonComponents.forEach((component) => {
  Vue.component(component.name, component)
})


// Global Components Account Root
Components.forEach((component) => {
  Vue.component(component.name, component)
})


// Plugins
Vue.use(Vuex)
Vue.use(AddConstants, Constants)

//Store
const store = new Vuex.Store(storeObj)

// Start
const root = new Vue({
  el: '#vue-container',
  store,
  mounted() {
    autoLogoutUser(store)
  }
})

console.log("vue-container just built")
