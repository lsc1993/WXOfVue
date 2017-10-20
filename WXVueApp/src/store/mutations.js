import * as types from './mutations-types'

export default {
	[types.SET_PRODUCT_DETAIL](state, product){
		state.productDetail = product;
	},
	[types.ADD_ORDER](state, order){
		state.orderList.push(order);
	},
	[types.CLEAR_ORDER](state){
		state.orderList.splice(0, state.orderList.length);
	},
	[types.SET_ADDRTEMP](state, address){
  		state.addrTemp = address;
    },
    [types.SET_ADDREDIT](state, address){
  		state.addrEdit = address;
    },
    [types.RESET_ADDREDIT](state){
  		state.addrEdit = {
			province: "选择省份",
			city: "选择城市",
			region: "选择地区",
		};
    },
    [types.SET_PROVINCE](state, province){
    	state.addrEdit.province = province;
    },
    [types.SET_CITY](state, city){
    	state.addrEdit.city = city;
    },
    [types.SET_REGION](state, region){
    	state.addrEdit.region = region;
    }
}
