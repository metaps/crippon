import Home from './components/Home.vue'
import MyAccount from './components/MyAccount.vue'
import BuyCoupon from './components/BuyCoupon.vue'
import CreateCoupon from './components/CreateCoupon.vue'


export const routes = [
    { path: '', component: Home},
    { path: '/myaccount', component: MyAccount},
    { path: '/buycoupon', component: BuyCoupon},
    { path: '/createcoupon', component: CreateCoupon}
]