import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const state = {
	authWX: {},
	productDetail: {},
	orderList:[],
	addrTemp: {}, //地址选择控件缓存
	addrEdit: {
		province: "选择省份",
		city: "选择城市",
		region: "选择地区",
	}, //地址修改缓存
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})