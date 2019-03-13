import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/mo_search';
import CommonComponents from '../components/00_common'

import { storeObj } from '../stores/managerStore'
import { autoLogoutUser } from '../util/auto-logout-user'


// Stylesheet
import '../styles/main.scss'

// Global Components Common
CommonComponents.forEach((component) => {
  Vue.component(component.name, component)
})


// Global Components Search Root
Components.forEach((component) => {
  Vue.component(component.name, component)
})

// Plugins
Vue.use(Vuex)
const store = new Vuex.Store(storeObj)

// Start
const rootDetail = new Vue({
  el: '#vue-container',
  store,
  mounted() {
    autoLogoutUser(store)
  }
})

