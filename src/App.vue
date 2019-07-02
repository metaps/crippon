<template>
  <div id="app">
      <app-header></app-header>
      <app-menu></app-menu> 
      <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import {getContract, getMyAccount} from './js/web3_util.js'
import axios from 'axios'

let contract =getContract

export default {
  name: 'app',
  data () {
  },
  mounted: async function(){
  },
  computed:{
  },
  methods: {
  },
  components: {
    appHeader: Header,
    appMenu: Menu
  }
}
</script>
