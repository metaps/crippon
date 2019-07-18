const GameItem = artifacts.require("./Contracts/GameItem.sol");

module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(
        GameItem
    );
};