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
