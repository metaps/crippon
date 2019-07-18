const Coupon = artifacts.require("./Contracts/Coupon.sol");

module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(
        Coupon
    );
};