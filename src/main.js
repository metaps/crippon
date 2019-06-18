import Vue from 'vue'
import App from './App.vue'
import Web3 from 'web3'

const web3 = new Web3(Web3.currentprovider)
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
