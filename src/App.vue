<template>
  <div id="app">
      <app-header></app-header>
      <app-menu></app-menu>      Wallet:<input v-model="this.walletAddress"  size="50"></input>
      <button v-on:click="this.items = getHisAssets">get</button>
      <button v-on:click="this.items = getMyAssets">get my assets</button>

      <app-item-grid :items="items"></app-item-grid>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import ItemGrid from './components/ItemGrid.vue'
import getContract from './js/getContract.js'
import getWeb3 from './js/getWeb3.js'
import axios from 'axios'

let web3 = getWeb3
let contract =getContract

export default {
  name: 'app',
  data () {
    return {
      items: ["waiting for load items"],
      count: 0,
      walletAddress: "0x9c36edd80831f7e0d95131c076ef918b056967cf",
      msg: "",
      tokenindexes: []
    }
  },
  mounted: async function(){
    console.log("mounted")
    console.log("mounted:"+ this.getMyWallet)
    let tokenids2 = []
    for(let i=0;i<10;i++){
      await contract.methods.tokenByIndex(i).call().then(function(value){
        tokenids2.push(parseInt(value._hex,16))
      })
    }
    this.tokenindexes=tokenids2
    console.log(tokenids2)
    this.items = this.getJsonFromTokenIds(tokenids2)

  },
  computed:{
    getMyAssets: async function(){
      let adr
      await web3.eth.getAccounts().then(function(value){adr = value[0]})
      return this.getJsonFromWalletAddress(adr)
    } ,
    getHisAssets: function(){
      return this.getJsonFromWalletAddress(this.walletAddress)
    }

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
      let num = 0
      await contract.methods.balanceOf(address).call().then(function(value){
        num = parseInt(value._hex,16)
      })

      let tokenids = []
      for(let i=0;i<num;i++){
        await contract.methods.tokenOfOwnerByIndex(address,i).call().then(function(value){
          axios
            .get("https://www.mycryptoheroes.net/metadata/extension/"+ value)
            .then(response => (this.items.push(response.data)))
        })
      }
    }
  },
  components: {
    appHeader: Header,
    appMenu: Menu,
    appItemGrid: ItemGrid
  }
}
</script>
