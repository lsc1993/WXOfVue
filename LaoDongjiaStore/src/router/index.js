import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productDetail = r => require.ensure([], () => r(require('../page/product/productDetail')), 'productDetail')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const shopcart = r => require.ensure([], () => r(require('../page/shopcart/shopcart')), "shopcart")
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const login = r => require.ensure([], () => r(require('../page/user/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/user/register')), 'register')
const changePass = r => require.ensure([], () => r(require('../page/user/changePass')), 'changePass')
const mine = r => require.ensure([], () => r(require('../page/user/mine')), 'mine')
const address = r => require.ensure([], () => r(require('../page/user/address')), 'address')
const orderMenu = r => require.ensure([], () => r(require('../page/order/orderMenu')), 'orderMenu')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')

export default new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/product/:pid',
      name: 'productDetail',
      component: productDetail
    },
    {
    	path: '/plist/:type',
    	name: 'productList',
    	component: productList
    },
    {
    	path: '/shopcart',
    	name: 'shopcart',
    	component: shopcart
    },
    {
    	path: '/user/',
    	component: user,
    	children: [
    		{path: 'login', name: 'login', component: login},
    		{path: '/user/register', name: 'register', component: register},
    		{path: '/user/changePass', name: 'changePass', component: changePass},
    		{path: '/user/mine', name: 'mine', component: mine},
    		{path: '/user/address', name: 'address', component: address},
    		{path: '/user/orderMenu', name: 'orderMenu', component: orderMenu}
    	]
    },
    {
    	path: '/order',
    	name: 'order',
    	component: order
    }
  ]
})
