<template>
      <b-card
    :title= "item.name"
    :img-src= "item.image"
    img-alt="Image"
    img-top
  >
    <b-card-text>
      <p v-if="isCoupon">Token id:  {{item.token_id}}</p>
      <p>Coupon Code:  {{"YS-" + item.token_type_id}}</p> 
      <p>Name:  {{item.name}}</p>
      <p>Price: {{item.price }}ETH</p>
    </b-card-text>

    <b-button href="#" variant="primary" v-on:click="buy(item)" v-if="!isCoupon&!isOwner">Buy</b-button>
    <b-button href="#" variant="primary" v-on:click="del(item)" v-if="!isCoupon&isOwner">Delete</b-button>
    <b-button href="#" variant="primary" v-on:click="use(item)" v-if="isCoupon&!isOwner">use</b-button>
    <b-button href="#" variant="primary" v-on:click="burn(item)" v-if="isCoupon&isOwner">burn</b-button>
  
  </b-card>

</template>

<script>
  import {buyCoupon, deleteCouponType,burnCoupon, useCoupon, isOwner} from '../js/web3_util.js'
  export default {
    props: ["item","isCoupon"],
    data () {
      return {
        isOwner: false
      }
    },
    methods: {
      buy: function (item) {
        buyCoupon(item.token_type_id,item.price)
      },
      del: function (item) {
        deleteCouponType(item.token_type_id)
      },
      use: function (item) {
        useCoupon(item.token_id)
      },
      burn: function (item) {
        burnCoupon(item.token_id)
      }
    },
    mounted: async function (item){
      this.isOwner = await isOwner()
    }
  }
</script>

<style>
    .panel-body {
        font-family: 'Arizonia', cursive;
        font-size: 24px;
        color: #6e6e6e;
        border-block-color: black;
    }

    .item {
        cursor: pointer;
    }

    .item:hover {
        background-color: #ffe2e2;
    }
</style>