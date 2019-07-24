import firebase from 'firebase' 

const config = {
    apiKey: "AIzaSyAosQ8_AIhltDbAINE0WPVYE_8ZegGKwKU",
    authDomain: "crippon-25d56.firebaseapp.com",
    databaseURL: "https://crippon-25d56.firebaseio.com",
    projectId: "crippon-25d56",
    storageBucket: "crippon-25d56.appspot.com",
    messagingSenderId: "320542177199",
    appId: "1:320542177199:web:919eb67f9e417fc3"
  };

firebase.initializeApp(config);

export default firebase

function getRef(){
    return firebase.firestore().collection("coupon_types")
}

export function getDb(){
    let output = []
    let couponTypesRef = getRef()
    let allCouponTypes = couponTypesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //exclude deleted coupons
        console.log(doc.data().active)
        if (doc.data().active) {
            output.push({"id":doc.id, "name":doc.data().name, "price":doc.data().price, "image":doc.data().pictureURI});
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    return output
}

export function setCouponType(CouponTypeId,name,price,pictureURI){
    let couponTypesRef = getRef()
    let token_type_id_fire_store
    let data = {
        "name": name,
        "price": price,
        "pictureURI": pictureURI,
        "active": true
    }
    let new_id = couponTypesRef.add(data).then(ref => {
        return ref.id
    })
    return new_id
}
