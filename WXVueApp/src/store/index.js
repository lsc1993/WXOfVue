import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const state = {
	productDetail: {
		id:"",
		pId:"",
		name:"",
		describe:"",
		price:"",
		saleVolum:"",
		count:1,
		imgIndex:"",
		imgDesc:{},
		imgTurn:{},
		standards:{}
	},
	orderList:[]
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})