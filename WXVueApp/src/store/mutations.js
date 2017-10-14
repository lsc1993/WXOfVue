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
	}
}
