import * as types from './mutations-types'

export default {
	[types.SET_PRODUCT_DETAIL](state, product){
		state.productDetail = product;
	}
}
