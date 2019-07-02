<template>
  <div id="app">
      <app-item-grid :items="items"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getMyAssets} from '../js/web3_util.js'
import axios from 'axios'

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
  computed:{
  },
  methods: {
  },
  components: {
    appItemGrid: ItemGrid
  }
}
</script>