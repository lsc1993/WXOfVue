import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const welcome = r => require.ensure([], () => r(require('../page/home/welcome')), 'welcome')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const productDetail = r => require.ensure([], () => r(require('../page/product/productDetail')), 'productDetail')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderStatus = r => require.ensure([], () => r(require('../page/order/orderStatusMenu')), 'orderStatus')
const orderList = r => require.ensure([], () => r(require('../page/order/orderList')), 'orderList')
const shopcart = r => require.ensure([], () => r(require('../page/shopcart/shopcart')), 'shopcart')
const mine = r => require.ensure([], () => r(require('../page/mine/mine')), 'mine')
const buyOrder = r => require.ensure([], () => r(require('../page/mine/myBuyOrder')), 'buyOrder')
const browse = r => require.ensure([], () => r(require('../page/mine/myBrowseOrder')), 'browseOrder')
const addrManager = r => require.ensure([], () => r(require('../page/address/addressManager')), 'addrManager')
const aboutUs = r => require.ensure([], () => r(require('../page/mine/aboutUs')), 'aboutUs')
const orderSuccess = r => require.ensure([], () => r(require('../page/notify/orderSuccess')), 'orderSuccess')
const receiveSuccess = r => require.ensure([], () => r(require('../page/notify/receiveSuccess')), 'receiveSuccess')

export default new Router({
  mode: "history",
  routes: [
  	{
  		path: '/WXVueApp/',
  		name: "welcome",
  		component: welcome
  	},
    {
      path: '/WXVueApp/home',
      component: home,
      children: [
        {path: "", name: "pList", component: productList},
      	{path: "/WXVueApp/plist/:id", name: "teaList", component: productList},
      	{path: "/WXVueApp/plist/:id", name: "taoList", component: productList}
      ]
    },
    {
    	path: '/WXVueApp/product/:id',
    	name: 'productDetail',
    	component: productDetail
    },
    {
    	path: '/WXVueApp/order',
    	name: 'order',
    	component: order
    },
    {
    	path: '/WXVueApp/orderlist',
    	component: orderStatus,
    	children: [
    		{path: "/WXVueApp/orderlist/:pos", name: "orderSend", component: orderList},
    	]
    },
    {
    	path: '/WXVueApp/shopcart',
    	name: 'shopcart',
    	component: shopcart
    },
    {
    	path: '/WXVueApp/mine',
    	name: 'mine',
    	component: mine
    },
    {
    	path: '/WXVueApp/buyorder',
    	name: 'buyOrder',
    	component: buyOrder
    },
    {
    	path: '/WXVueApp/browse',
    	name: 'browseOrder',
    	component: browse
    },
    {
    	path: '/WXVueApp/addr',
    	name: 'addrManager',
    	component: addrManager
    },
    {
    	path: '/WXVueApp/about',
    	name: 'aboutUs',
    	component: aboutUs
    },
    {
    	path: '/WXVueApp/orderSuccess',
    	name: 'orderSuccess',
    	component: orderSuccess
    },
    {
    	path: '/WXVueApp/receiveSuccess',
    	name: 'receiveSuccess',
    	component: receiveSuccess
    }
  ]
})
