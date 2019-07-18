const Asset = artifacts.require("./Asset.sol");

module.exports = async(deployer, network, accounts) => {
    const name = "SimpleAsset";
    const symbol = "SA";
    const tokenId = 1;
    const tokenURI = "https://ipfs.io/ipfs/QmYMYdJqSrTNB3iwXzmYfGdjAymuXvHAJuum9zzT7RV7N1";

    await deployer.deploy(
        Asset,
        name,
        symbol,
        tokenId,
        tokenURI
    );
};