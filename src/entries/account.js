import Vue from 'vue'
import Vuex from 'vuex'

import Components from '../components/account'

import { storeObj } from '../stores/managerStore'

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
  store
})

console.log("vue-container just built")
