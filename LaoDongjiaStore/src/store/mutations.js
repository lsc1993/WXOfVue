import * as types from './mutations-types'

export default {
	[types.SET_ADDREDIT](state, addr){
		state.addrEdit = addr;
	},
	[types.RESET_ADDREDIT](state){
		state.addrEdit = {
			"province": "请选择省份",
			"city": "请选择城市",
			"region": "请选择地区"
		};
	},
	[types.SET_PROVINCE](state, prov){
		state.addrEdit.province = prov;
	},
	[types.SET_CITY](state, city){
		state.addrEdit.city = city;
	},
	[types.SET_REGION](state, region){
		state.addrEdit.region = region;
	},
	[types.SET_ADDRTEMP](state, addr){
		state.addrTemp = addr;
	},
	[types.ADD_ORDER](state, order){
		state.orderList.push(order);
	},
	[types.CLEAR_ORDER](state){
		state.orderList.splice(0, state.orderList.length);
	}
}
