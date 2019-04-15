import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/home'

import { storeObj } from '../stores/managerStore'

import CommonComps from '../plugins/components.bundle'
//import CommonComps from 'rmondardo-vuejs-commons-comps/dist/components.bundle'


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
  el: '#vue-app',
  store,
  mounted() {
    console.log(`vue app just build`)
  }
})


