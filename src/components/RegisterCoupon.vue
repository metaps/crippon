<template>
  <div id="app">
      <b-form v-if="show">
      <b-form-group
        id="input-group-1"
        label="Coupon Name:"
        label-for="input-1"
        description="Name of the coupon"
      >
        <b-form-input
          id="input-1"
          v-model="form.token_name"
          required
          placeholder="Name of the poroduct user can exchange with this coupon."
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="URL:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.token_pictureURI"
          required
          placeholder="Enter URL of the picture"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.token_price"
          required
            placeholder="Price of the coupon in wei."
        ></b-form-input>
      </b-form-group>


      <b-button variant="primary" v-on:click="add()">Create</b-button>
    </b-form>
      <b-card
      :title= "form.token_name"
      :img-src= "form.token_pictureURI"
      img-alt="Image"
      img-top
      style="max-width: 300px;"
    >
      <b-card-text>
        Coupon Name:  {{form.token_name}} <br>
        Price(ETH):{{ form.token_price/1000000000000000000 }}<br>
      </b-card-text>
      </b-card>

    <b-card-group columns>

    </b-card-group>

  </div>
</template>

<script>
import {getDb} from '../js/firestore.js'
import { buyCoupon, addCouponType ,getWeb3} from '../js/web3_util';

export default {
  name: 'app',
  data () {
    return {
      show: true,
      form: {
        token_name: "",
        token_price: 0,
        token_pictureURI: ""
      }
    }
  },
  mounted: async function(){

  },
  methods:{
    add: function() {
      addCouponType(this.form.token_price, this.form.token_name, this.form.token_pictureURI)

    }

  }
  ,
  components: {
  
  }
}
</script>