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
  		path: '/',
  		name: "welcome",
  		component: welcome
  	},
    {
      path: '/home',
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
    	path: '/orderlist/',
    	component: orderStatus,
    	children: [
    		{path: ":pos", name: "orderSend", component: orderList},
    	]
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
    },
    {
    	path: '/buyorder',
    	name: 'buyOrder',
    	component: buyOrder
    },
    {
    	path: '/browse',
    	name: 'browseOrder',
    	component: browse
    },
    {
    	path: '/addr',
    	name: 'addrManager',
    	component: addrManager
    },
    {
    	path: '/about',
    	name: 'aboutUs',
    	component: aboutUs
    },
    {
    	path: '/orderSuccess',
    	name: 'orderSuccess',
    	component: orderSuccess
    },
    {
    	path: '/receiveSuccess',
    	name: 'receiveSuccess',
    	component: receiveSuccess
    }
  ]
})
