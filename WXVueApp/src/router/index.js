import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {path: "", name: "pList", component: productList},
      	{path: "product/:id", name: "teaList", component: productList},
      	{path: "product/:id", name: "taoList", component: productList}
      ]
    }
  ]
})
