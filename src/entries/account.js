import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/mo_account'

import { storeObj } from '../stores/managerStore'
import { autoLogoutUser } from '../util/auto-logout-user'

import AddConstants from '../plugins/addConstants'
import Constants from '../util/constants'

import CommonComps from '../plugins/components.bundle'

// Stylesheet
import '../styles/main.scss'

// Global Components Account Root
Components.forEach((component) => {
  Vue.component(component.name, component)
})


// Plugins
Vue.use(Vuex)
Vue.use(AddConstants, Constants)

Vue.use(CommonComps)

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
