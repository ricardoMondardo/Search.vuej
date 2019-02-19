import Vue from 'vue'
import Sitecore from './plugins/sitecore'
import components from './components/02_conectaDetail';

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
const rootDetail = new Vue({
  el: '#vue-containerDetail'
})

console.log(components)
console.log(rootDetail)
console.log("vue-container detail just built")
