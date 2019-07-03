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

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appMenu: Menu
  }
}
</script>
