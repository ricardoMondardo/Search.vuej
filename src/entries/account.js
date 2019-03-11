import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/mo_account'

import { storeObj } from '../stores/managerStore'
import { autoLogoutUser } from '../util/auto-logout-user'

//
// Stylesheet
//
import '../styles/main.scss'


//
// Global Components
//
Components.forEach((component) => {
  Vue.component(component.name, component)
})


//
// Plugins
//
Vue.use(Vuex)
const store = new Vuex.Store(storeObj)

//
// Start
//
const root = new Vue({
  el: '#vue-container',
  store,
  mounted() {
    autoLogoutUser(store)
  }
})


console.log("vue-container just built")
