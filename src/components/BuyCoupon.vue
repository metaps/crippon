<template>
  <div id="app">
      <app-item-grid :items="items"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getDb} from '../js/firestore.js'
import { getAllTokenTypes, AllCouponTypesServer, AllCouponTypesEth } from '../js/web3_util';

export default {
  name: 'app',
  data () {
    return {
      items: []    
    }
  },
  mounted: async function(){
    let all_coupon_types_eth = await AllCouponTypesEth()
    let all_coupon_types = await AllCouponTypesServer(all_coupon_types_eth)
    this.items = all_coupon_types
    console.log(this.items)
  },
  methods:{

  }
  ,
  components: {
    appItemGrid: ItemGrid
  }
}
</script>