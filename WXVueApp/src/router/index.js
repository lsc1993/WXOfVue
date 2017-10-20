import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const productDetail = r => require.ensure([], () => r(require('../page/product/productDetail')), 'productDetail')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const shopcart = r => require.ensure([], () => r(require('../page/shopcart/shopcart')), 'shopcart')
const mine = r => require.ensure([], () => r(require('../page/mine/mine')), 'mine')

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {path: "", name: "pList", component: productList},
      	{path: "plist/:id", name: "teaList", component: productList},
      	{path: "plist/:id", name: "taoList", component: productList}
      ]
    },
    {
    	path: '/product/:id',
    	name: 'productDetail',
    	component: productDetail
    },
    {
    	path: '/order',
    	name: 'order',
    	component: order
    },
    {
    	path: '/shopcart',
    	name: 'shopcart',
    	component: shopcart
    },
    {
    	path: '/mine',
    	name: 'mine',
    	component: mine
    }
  ]
})
