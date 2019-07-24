import Web3 from 'web3'
import axios from 'axios'
import tokenABI from './tokenABI.js'


const web3 = getWeb3()
const contract = getContract()

//メタマスクのロード
export function getWeb3(){
    let web3
    if (window.ethereum) {
        web3 = new Web3(ethereum);
        try {
        // Request account access if needed
        ethereum.enable();
        // Acccounts now exposed
        } catch (error) {
        // User denied account access...
        console.log('User denied account access...');
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    return web3
}


//コントラクトのロード
function getContract(){
    const contractHashMCHE = "0xdceaf1652a131F32a821468Dc03A92df0edd86Ea"
    const contractHashMLB = "0x8c9b261faef3b3c2e64ab5e58e04615f8c788099"
    const contractHashYS = "0x103c3a1a8dac658563d131054a6027f09ac48fe6"
    return web3.eth.Contract(tokenABI, contractHashYS)
}


//tokenidからjsonを取得
//引数[2002023,2002012,2002022]
//戻り値[json,json,json,json]
async function getJsonFromTokenIds(tokenids){
    let output = []
    for(let i=0;i<tokenids.length;i++){
        let token_type_id =  await contract.methods._tokenCouponTypeId(tokenids[i]).call().then(function(value){
            return value
        })        
        let price =  await contract.methods._tokenPrice(tokenids[i]).call().then(function(value){
            return web3.utils.fromWei(web3.utils.toBN(value))
        })
        await contract.methods.tokenURI(tokenids[i]).call().then(function(value){
        axios
        .get(value)
        .then(response => (
            output.push({
                "token_id": tokenids[i],
                "token_type_id": token_type_id,
                "name" : response.data.fields.name.stringValue,
                "price" : price,
                "image": response.data.fields.pictureURI.stringValue
            })
        ))
        })
    }
    return output
}
//ウォレットアドレスにひもづくマイクリ アセットを全て取得する。
//引数 "0x6B3c92AADB19750F3dFaAD31974d8B3c7E7A171E"
//戻り値[json, json, json...]
export async function getJsonFromWalletAddress(address){
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
    return getJsonFromTokenIds(assets)
}
//自分の持ってるアセットのメタデータをjsonで取得
export async function getMyAssets(){
    let address = await web3.eth.getAccounts().then(function(value){return value[0]})
    return getJsonFromWalletAddress(address)
}
export async function getMyAddress(){
    let address = await web3.eth.getAccounts().then(function(value){return value[0]})

    return address
}



//index 1-10のアセットを取得
export async function getRandomAssets(){
    let tokenids2 = []
    for(let i=0;i<10;i++){
        await contract.methods.tokenByIndex(i).call().then(function(value){
            tokenids2.push(parseInt(value._hex,16))
        })
    }
    console.log(tokenids2)
    return getJsonFromTokenIds(tokenids2)
}




export async function buyCoupon(tokenTypeId, price){
    let address = await getMyAddress()
    price = web3.utils.toWei(price)
    contract.methods.buyCoupon(tokenTypeId).send({"from":address,"value":price})
}


export async function useCoupon(tokenId) {
    let from = await getMyAddress()
    let to = "0xAb18bFFf111BC9D120007378645ECf745cf32BB5"
    contract.methods.transferFrom(from,to,tokenId).send({"from":from})
}


export async function burnCoupon(token_id) {
    let address = await getMyAddress()
    console.log(token_id)
    contract.methods.burn(token_id).send({"from":address})
}

export async function addCouponType(price,name,token_type_id) {
    let baseURI = "https://firestore.googleapis.com/v1/projects/crippon-25d56/databases/(default)/documents/coupon_types/"
    let tokenURI = baseURI + token_type_id
    console.log(tokenURI)
    let from = await getMyAddress()
    price = web3.utils.toWei(price)
    contract.methods.addCouponType(price,name,tokenURI).send({"from":from})
}

export async function deleteCouponType(couponTypeId) {
    let from = await getMyAddress()
    contract.methods.deleteCouponType(couponTypeId).send({"from":from})
}

export async function getLastCouponTypeId() {
    let lastCouponTypeId
    await contract.methods.totalSupplyCouponType().call().then(function(value){lastCouponTypeId = web3.utils.hexToNumber(value)})
    console.log(lastCouponTypeId)
    return lastCouponTypeId
}

//download all coupontypes from blockchain
export async function AllCouponTypesEth(){
    let tokenTypes = []
    let lastTokenTypeId 
    await contract.methods.totalSupplyCouponType().call().then(function(value){lastTokenTypeId = web3.utils.hexToNumber(value)})
    console.log({"lasttokentypeid": lastTokenTypeId})
    for(let i=1;i<=lastTokenTypeId;i++){
        await contract.methods.couponType(i).call().then(function(value){
            console.log(value[0])
            if(value[0]._hex != "0x00"){
                tokenTypes.push({"token_type_id":i,
                    "price":web3.utils.fromWei(web3.utils.toBN(value[0])),
                    "name":value[1],
                    "url":value[2]
                })
            }
        })
    }
    console.log({"token_types":tokenTypes})
    return tokenTypes
}
//download all coupontypes from Server.
export function AllCouponTypesServer(tokentypes){
    let output = []
    for(let i=0;i<tokentypes.length;i++){
        axios
        .get(tokentypes[i].url)
        .then(response => (
            output.push({
                "token_type_id": tokentypes[i].token_type_id,
                "name" : response.data.fields.name.stringValue,
                "price" : tokentypes[i].price, //return price from ethereum
                "image": response.data.fields.pictureURI.stringValue
            })
        ))
    }
    console.log(output)
    return output
}

export async function getDeployer(){
    let deployer
    await contract.methods.deployer().call().then(function(value){deployer = value})
    return deployer
}

export async function isOwner(){
    let myAddress = await getMyAddress()
    let deployerAddress = await getDeployer()
    return myAddress == deployerAddress
}