<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
      <app-menu></app-menu>
      <app-item-grid :items="items"></app-item-grid>
    </div> 
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import ItemGrid from './components/ItemGrid.vue'
 
export default {
  name: 'app',
  data () {
    return {
      items: ['Just an Item for sample coupon.','Just an Item for sample coupon.','Just an Item for sample coupon.'],
      msg: "my message"
    }
  },
  components: {
    appHeader: Header,
    appMenu: Menu,
    appItemGrid: ItemGrid
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
