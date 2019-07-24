<template>
  <b-nav>
    <b-nav-item active v-if="isOwner"><router-link to='/'>Coupon Types</router-link></b-nav-item>
    <b-nav-item active v-if="!isOwner"><router-link to='/'>Buy Coupon</router-link></b-nav-item>
    <b-nav-item v-if="isOwner"><router-link to='createcoupontype'>Create New Coupon Type</router-link></b-nav-item>
    <b-nav-item><router-link to='myaccount' v-if="isOwner">Received Coupons</router-link></b-nav-item>
    <b-nav-item><router-link to='myaccount' v-if="!isOwner">My Coupons</router-link></b-nav-item>

  </b-nav>
</template>
<script>
import {isOwner} from '../js/web3_util';
export default {
  data () {
    return {
      isOwner: false
    }
  },
  mounted: async function () {
    this.isOwner = await isOwner()
  }
}
</script>