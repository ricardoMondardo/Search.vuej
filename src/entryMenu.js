import Vue from 'vue'
import components from './components/03_menu';

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


//
// Start
//
const rootDetail = new Vue({
  el: '#vue-menu'
})

console.log("vue-container detail just built")
