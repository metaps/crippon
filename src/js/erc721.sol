//Solidityのバージョン宣言
pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

//OpenZeppelinをインポートすることで、ERC721の基本機能を導入
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/drafts/Counters.sol";

//ERC721Fullを継承してCouponという名前の新しいコントラクトを作る
contract Coupon is ERC721Full {
    //トークンIDの順番を計算するために、OpenZeppelinのカウンターをインポート
    using Counters for Counters.Counter;
    //CountersのCounterを_tokenIdsという名称でインスタンス生成
    //privateを宣言することで、Couponコントラクト内だけで使える変数として宣言
    Counters.Counter private _tokenIds;

    //クーポンIDの採番をするために、OpenZeppelinのカウンターをインポート
    Counters.Counter private _couponTypeIds;

    //deployerという変数を支払いの関連するアドレスとして宣言
    //publicをつけて外部からもアクセスできるようにする。
    address payable public deployer;

    //コンストラクターとは、コードをデプロイする時のみに実行されるコードのこと
    //ここではERC721Fullというファンクションを実行し、ERC721コントラクトの名前をCoupon
    //ショートネームを"CP"に設定し、deployerという変数にmsg.senderを代入しています。
    //msg.senderとはトランザクションを実行した人のアドレスを表しています。
    constructor() ERC721Full("Coupon", "CP") public {
        deployer = msg.sender;
    }

    //structを宣言することで、他の言語の辞書のように、
    //異なった値の変数に名称をつけてまとめることができます。
    //CouponTypeという名前のstructを生成
    struct CouponType {
        //CouponTypeの要素としてcoupon_priceという名前で型がuintの変数を作成
        uint coupon_price;
        
        //CouponTypeの要素としてcoupon_nameという名前で型がuintの変数を作成
        string coupon_name;

        //CouponTypeの要素としてcoupon_URIという名前で型がuintの変数を作成
        string coupon_URI;
    }

    //なおmappingはkeyを保存している訳ではなく、keyのハッシュを保存しているので、keyを一覧で取得することはできません。


    //mappingとは配列のようなkeyのようなもので、同じ型の複数の値を保存しておくことができます。
    //mapping (uint => CouponType) couponTypes;だと
    //CouponTypesという名前のmappingがuint(数値型)をkeyとして、CouponTypeをバリューとするものだと宣言しています。
    mapping (uint => CouponType) couponTypes;

    mapping (uint256 => uint256) _tokenPrices;
    //_tokenNamesという名前のmappingがuint256(長めの数値型)をkeyとして、string(文字列)をバリューとするものだと宣言しています。
    mapping (uint256 => string) _tokenNames;

    //_tokenCouponTypeIdsという名前のmappingがuint256(長めの数値型)をkeyとして、uint256(長めの数値型)を保管するもの
    mapping (uint256 => uint256) _tokenCouponTypeIds;


    event newCouponTypeIdIssued(address issuer, uint couponId);
    event newtokenIdMinted(address buyer, uint tokenId);


    function _tokenPrice(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "couponType for nonexistent token");
        return _tokenPrices[tokenId];
    }

    function _setTokenPrice(uint256 tokenId, uint256 token_price) internal {
        require(_exists(tokenId), "Token type set of nonexistent token");
        _tokenPrices[tokenId] = token_price;
    }

    function _tokenCouponTypeId(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "couponType for nonexistent token");
        return _tokenCouponTypeIds[tokenId];
    }
    function totalSupplyCouponType() external view returns (uint256) {
        return _couponTypeIds.current();
    }

    function _setTokenCouponTypeId(uint256 tokenId, uint256 coupon_type_id) internal {
        require(_exists(tokenId), "Token type set of nonexistent token");
        _tokenCouponTypeIds[tokenId] = coupon_type_id;
    }
    
    function tokenName(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Name query for nonexistent token");
        return _tokenNames[tokenId];
    }

    function _setTokenName(uint256 tokenId, string memory name) internal {
        require(_exists(tokenId), "Name set of nonexistent token");
        _tokenNames[tokenId] = name;
    }

    function addCouponType(uint coupon_price, string memory coupon_name, string memory coupon_URI) public returns (uint) {
        require(msg.sender == deployer);
        _couponTypeIds.increment();
        uint256 newCouponId = _couponTypeIds.current();
        couponTypes[newCouponId] = CouponType(coupon_price, coupon_name, coupon_URI);
        emit newCouponTypeIdIssued(msg.sender, newCouponId);

    }

    function deleteCouponType(uint couponId) public returns (uint) {
        require(msg.sender == deployer, "only owner can delete coupont_type");
        delete couponTypes[couponId];
    }

    function couponType(uint id) public view returns (CouponType memory) {
        return (couponTypes[id]);
    }

    function buyCoupon(uint couponTypeId) public payable returns (uint256) {
        require(msg.sender != deployer);
        uint256 coupon_price = couponTypes[couponTypeId].coupon_price;
        require(msg.value == coupon_price, "the sent amount is not matched with the price.");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenPrice(newItemId,couponTypes[couponTypeId].coupon_price);
        _setTokenURI(newItemId,couponTypes[couponTypeId].coupon_URI);
        _setTokenName(newItemId, couponTypes[couponTypeId].coupon_name);
        _setTokenCouponTypeId(newItemId, couponTypeId);
        emit newtokenIdMinted(msg.sender, newItemId);
    }
    function burn(uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId));
        require(msg.sender == deployer);
        _burn(msg.sender, _tokenId);
    }
}