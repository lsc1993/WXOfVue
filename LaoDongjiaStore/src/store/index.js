import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const state = {
	addrTemp: {},
	addrEdit: {
		"province": "请选择省份",
		"city": "请选择城市",
		"region": "请选择地区"
	},
	orderList: []
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
