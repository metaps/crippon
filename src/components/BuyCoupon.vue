<template>
  <div id="app">
      <app-item-grid :items="items" :isCoupon="isCoupon"></app-item-grid>
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import {getDb} from '../js/firestore.js'
import { getAllTokenTypes, AllCouponTypesServer, AllCouponTypesEth, isOwner} from '../js/web3_util';

export default {
  name: 'app',
  props: ["isCoupon"],
  data () {
    return {
      items: []    
    }
  },
  mounted: async function(){
    let all_coupon_types_eth = await AllCouponTypesEth()
    let all_coupon_types = await AllCouponTypesServer(all_coupon_types_eth)
    this.items = all_coupon_types
 
  },
  methods:{

  }
  ,
  components: {
    appItemGrid: ItemGrid
  }
}
</script>