<template>
  <div id="app">
      <app-item-grid :items="items" :isCoupon="isCoupon"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getMyAssets, buyCoupon, isOwner} from '../js/web3_util.js'
import {getDb} from '../js/firestore.js'

export default {
  name: 'app',
  props: ['isCoupon'],
  data () {
    return {
      items: [],
    }
  },
  mounted: async function(){
    console.log(this.isCoupon)
    this.items = await getMyAssets().then(function(value){return value})
  },
  components: {
    appItemGrid: ItemGrid
  }
}
</script>