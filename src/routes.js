import MyAccount from './components/MyAccount.vue'
import BuyCoupon from './components/BuyCoupon.vue'
import CreateCouponType from './components/CreateCouponType.vue'
import AllCoupons from './components/AllCoupons.vue'

export const routes = [
    { path: '', component: BuyCoupon, props: { isCoupon: false}},
    { path: '/myaccount', component: MyAccount, props: { isCoupon: true}},
    { path: '/createcouponType', component: CreateCouponType},
    { path: '/allcoupons', component: AllCoupons, props: { isCoupon: true}}    
]


