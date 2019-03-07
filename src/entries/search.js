import Vue from 'vue'
import Vuex from 'vuex'

import components from '../components/search';
import { storeObj } from '../stores/managerStore'

// Stylesheet
import '../styles/main.scss'

// Global Components
components.forEach((component) => {
  Vue.component(component.name, component)
})

// Plugins
Vue.use(Vuex)
const store = new Vuex.Store(storeObj)

// Start
const rootDetail = new Vue({
  el: '#vue-container',
  store
})

console.log("vue-container detail just built")
