import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productDetail = r => require.ensure([], () => r(require('../page/product/productDetail')), 'productDetail')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')

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
    	path: '/plist',
    	name: 'productList',
    	component: productList
    }
  ]
})
