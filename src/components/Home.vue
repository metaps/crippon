<template>
  <div id="app">
      <app-item-grid :items="items"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getRandomAssets} from '../js/web3_util.js'

export default {
  name: 'app',
  data: function () {
    return {
      items: []
    }
  },
  mounted: async function(){
    this.items = await getRandomAssets().then(function(value){
      return value
    })
  },
  components: {
    appItemGrid: ItemGrid
  }
}
</script>
