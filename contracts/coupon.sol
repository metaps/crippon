pragma solidity ^0.5.8;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/drafts/Counters.sol";

contract Coupon is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _couponTypeIds;
//    constructor() ERC721Full("Coupon", "CP") public {
//    }
    //counpon_type

//web3js
// solidity(int = eth_price)
// web3
//coupon登録用のファンクション
//coupon = {coupon_price, coupon_name, coupon_URI}をmapで持っておく。 (done)
//クーポンの追加と削除、ownable openzeppelinで実行
//msg.value で送られてきた金額が見れる
//require でmsg.valueとcoupon_priceの比較を行う。
//msg.value == coupon_price ??
//transaction失敗した場合、ガスが消えて終わり。
// if True -->  mint()
    struct CouponType {
        uint coupon_price;
        string coupon_name;
        string coupon_URI;
    }
    mapping (uint => CouponType ) couponTypes;
    function addCouponType(uint coupon_price, string memory coupon_name, string memory coupon_URI) public returns (uint) {
        _couponTypeIds.increment();
        uint256 newCouponId = _couponTypeIds.current();
        couponTypes[newCouponId] = CouponType(coupon_price, coupon_name, coupon_URI);
        return newCouponId;
    }

    function getCouponType(uint id) public view returns (uint, string memory, string memory) {
        return (couponTypes[id].coupon_price, couponTypes[id].coupon_name, couponTypes[id].coupon_URI);
    }

//    function deleteCouponType(uint _key)
//    function buyCoupon(address buyer)

    function buyCoupon(uint couponTypeId, address buyer) public payable returns (uint256) {
        uint256 coupon_price = couponTypes[couponTypeId].coupon_price;
        string memory coupon_uri = couponTypes[couponTypeId].coupon_URI;
        require(msg.value == coupon_price, "msg.value and coupon price should match");
        mintCoupon(buyer, coupon_uri);
    }

    function mintCoupon(address buyer, string memory tokenURI) public payable returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(buyer, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}