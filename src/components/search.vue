<template>
  <div id="app">
      <app-item-grid :items="items"></app-item-grid>
      
  </div>
</template>

<script>
import ItemGrid from './ItemGrid.vue'
import getContract from '../js/getContract.js'
import getWeb3 from '../js/getWeb3.js'
import axios from 'axios'

let web3 = getWeb3
let contract =getContract

export default {
  name: 'app',
  data () {
    return {
      items: []    
    }
  },
  mounted: async function(){
      this.setMyAssets
  },
  computed:{
  },
  methods: {
    getJsonFromTokenIds(tokenids){
      let output = []
      for(let i=0;i<tokenids.length;i++){
      axios
        .get("https://www.mycryptoheroes.net/metadata/extension/"+ tokenids[i])
        .then(response => (output.push(response.data)))
      }
      return output
    },
    getJsonFromWalletAddress: async function (address) {
      let num 
      let assets = []
      await contract.methods.balanceOf(address).call().then(function(value){
        num = parseInt(value._hex,16)
      })
      for(let i=0;i<num;i++){
        await contract.methods.tokenOfOwnerByIndex(address,i).call().then(function(value){
          assets.push(value)
        })
      }
      return this.getJsonFromTokenIds(assets)
    },
    setMyAssets: async function(){
      let adr
      await web3.eth.getAccounts().then(function(value){adr = value[0]})
      this.items = await this.getJsonFromWalletAddress(adr)
    } 
  },
  components: {
    appItemGrid: ItemGrid
  }
}
</script>