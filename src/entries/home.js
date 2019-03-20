import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/mo_home'

import { storeObj } from '../stores/managerStore'
import { autoLogoutUser } from '../util/auto-logout-user'

//import CommonComps from '../plugins/components.bundle'
import CommonComps from 'rmondardo-vuejs-commons-comps/dist/components.bundle'


// Stylesheet
import '../styles/main.scss'

// Global Components Home Root
Components.forEach((component) => {
  Vue.component(component.name, component)
})

// Plugins
Vue.use(Vuex)

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


