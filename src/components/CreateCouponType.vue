<template>
  <div id="app">
    <b-container>
      <b-row>
      <b-col cols="8">
        <p v-if="!show">Only contract deployer can create new Coupon Type.</p>

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
      </b-col>
      <b-col cols="4">
      <b-card v-if="show"
      :title= "form.token_name"
      :img-src= "form.token_pictureURI"
      img-alt="Image"
      img-top
      style="max-width: 300px;"
    >
      <b-card-text>
        Coupon Name:  {{form.token_name}} <br>
        Price:{{ form.token_price}} ETH<br>
      </b-card-text>
      </b-card>

    <b-card-group columns>

    </b-card-group>
    </b-col>
    </b-row>
    </b-container>  
  </div>
</template>

<script>
import {setCouponType} from '../js/firestore.js'
import { buyCoupon, addCouponType ,getWeb3, getLastCouponTypeId, isOwner} from '../js/web3_util';

export default {
  name: 'app',
  
  data () {
    return {
      show: false,
      form: {
        token_name: "",
        token_price: 0,
        token_pictureURI: ""
      }
    }
  },
  mounted: async function(){
    this.show = await isOwner()
    console.log(await isOwner())
  },
  methods:{
    add: async function() {
      let token_type_id = await getLastCouponTypeId()
      console.log(token_type_id)
      let fire_store_id = await setCouponType(token_type_id, this.form.token_name,this.form.token_price, this.form.token_pictureURI)
      await addCouponType(this.form.token_price,this.form.token_name,fire_store_id)

    }

  }
  ,
  components: {
  
  }
}
</script>