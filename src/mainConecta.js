import Vue from 'vue'
import Sitecore from './plugins/sitecore'
import components from './components/01_conecta';

//
// Stylesheet
//
import './styles/main.scss'


//
// Global Components
//
components.forEach((component) => {
  Vue.component(component.name, component)
})


//
// Plugins
//
Vue.use(Sitecore)

//
// Start
//
const root = new Vue({
  el: '#vue-container'
})

console.log("vue-container just built")
