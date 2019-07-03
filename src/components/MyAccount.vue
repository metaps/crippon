<template>
  <div id="app">
      <app-item-grid :items="items"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getMyAssets} from '../js/web3_util.js'
export default {
  name: 'app',
  data () {
    return {
      items: []    
    }
  },
  mounted: async function(){
    this.items = await getMyAssets().then(function(value){return value})
  },
  components: {
    appItemGrid: ItemGrid
  }
}
</script>