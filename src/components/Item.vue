<template>
      <b-card
    :title= "item.name"
    :img-src= "item.image"
    img-alt="Image"
    img-top
  >
    <b-card-text>
      Token id:  {{item.token_id}} <br>
      name:  {{item.name}} <br>
      price:{{ item.price }}<br>
    </b-card-text>

    <b-button href="#" variant="primary" v-on:click="buy(item)">Buy</b-button>
    <b-button href="#" variant="primary" v-on:click="del(item)">Delete</b-button>
    <b-button href="#" variant="primary" v-on:click="use(item)">use</b-button>
  
  </b-card>

</template>

<script>
  import {buyCoupon, deleteCoupon, useCoupon} from '../js/web3_util.js'
  export default {
    props: ["item"],
    methods: {
      buy: function (item) {
        buyCoupon(item.id,item.price)
      },
      del: function (item) {
        deleteCoupon(item.id)
      },
      use: function (item) {
        useCoupon(item.token_id)
      }

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