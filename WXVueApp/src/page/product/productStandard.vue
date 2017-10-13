<template>
	<div>
		<transition name="popup-window-transition">
			<div class="popup-window-modal-mask">
				<div class="popup-window-modal-wrapper">
					<div class="popup-window-modal-container">
						<div class="product-detail container">
							<slot name="product-detail">
								<div class="row">
									<div class="product-img-pop col-md-2 col-sm-2 col-xs-3">
										<img :src="productitem.imgurl" />
									</div>
									<div class="product-price-name col-md-9 col-sm-9 col-xs-7">
										<p>{{productitem.name}}</p>
										<p>{{productitem.price}}</p>
									</div>
									<div class="product-pop-remove col-md-1 col-sm-1 col-xs-1">
										<button @click="$emit('close')"><i class="icon-remove"></i></button>
									</div>
								</div>
							</slot>
						</div>
						<div class="product-standard-pop">
							<p>规格:</p>
							<div class="product-standard-ul">
								<ul>
									<li v-for="(label,index) in productMessage.labels" :key="label.id" v-on:click="chooseLabel(index)" :class="{'product-standard-choosed' : label.isChoosed, 'product-standard-unchoosed' : !label.isChoosed}">
										{{label.label}}
									</li>
								</ul>
							</div>
						</div>
						<div class="product-sale-count">
							<p>数量:</p>
							<div class="product-count-caculator">
								<p onclick="subCount()">-</p>
								<p>{{productitem.count}}</p>
								<p onclick="addCount()">+</p>
							</div>
						</div>
						<div class="product-operator">
							<div id="add-cart-btn" class="product-add-shopcart product-operator-half-width" onclick="addShopCart()">
								<p>加入购物车</p>
							</div>
							<div class="product-buy-now product-operator-half-width" onclick="buyNow()">
								<p>购买</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data () {
			return {
				product: {}
			}
		},
		computed: {
			...mapState([
				"productDetail"
			]),
			initProduct(){
				this.product = this.productDetail;
			}
		}
	}
</script>

<style>
	/*
	 * popupwindow外部底部样式
	 * */
	.popup-window-modal-mask {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.5);
		display: table;
	    transition: opacity .3s ease;
		-webkit-transition: .3s ease;
	}
	
	.popup-window-modal-wrapper {
		display: table-cell;
	}
	
	.popup-window-modal-container {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: auto;
		max-height: 80%;
		overflow-y: scroll;
		margin: 0px auto;
		background-color: #fff;
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}
	.popup-window-modal-container::-webkit-scrollbar {
	    display: none;
	}
	/*
	 * 产品页面产品选择popupwindow样式
	 */
	.product-detail {
		padding: 2% 2% 1% 3%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-img-pop {
		padding: 2% 0 0 3%;
	}
	
	.product-img-pop img {
		width: 100%;
		height: 100%;
	}
	
	.product-price-name {
		padding: 0 0 0 3%;
	}
	
	.product-price-name p {
		font-size: 15px;
		margin-top: 5px;
	}
	
	.product-pop-remove {
		position: absolute;
		right: 3%;
		top: 3%;
		z-index: 1000;
	}
	
	.product-pop-remove button {
		border-radius: 50%;
		border: 1px solid #CCCCCC;
		background-color: rgba(255,255,255,.5);
	}
	
	.product-standard-pop {
		padding: 2% 2% 1% 3%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-standard-ul ul {
		list-style: none;
		padding: 0;
	}
	
	.product-standard-ul li {
		width: auto;
		display: inline-block;
		margin-left: 5%;
		margin-top: 2px;
		border-radius: 1px;
	}
	
	.product-standard-unchoosed {
		border: 1px solid #CCCCCC;
	}
	
	.product-standard-choosed {
		border: 1px solid #EEA236;
	}
	
	.product-sale-count {
		padding: 2% 2% 1% 3%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-sale-count p {
		width: auto;
		line-height: 30px;
		font-size: 16px;
		display: inline-block;
	}
	
	.product-count-caculator {
		float: right;
		text-align: center;
	}
	.product-count-caculator p {
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		font-weight: 400;
		border: 1px solid #CCCCCC;
		border-radius: 1px;
	}
	
	.product-operator {
		width: 100%;
		height: 50px;
		margin-top: 1%;
	}
	
	.product-operator-full-width {
		width: 100%;
	}
	
	.product-operator-half-width {
		width: 50%;
	}
	
	.product-add-shopcart {
		height: 50px;
		line-height: 50px;
		background-color: #D9534F;
		display: inline-block;
		text-align: center;
		color: #FFFFFF;
		font-weight: 500;
		float: left;
	}
	
	.product-buy-now {
		height: 50px;
		line-height: 50px;
		background-color: #F0AD4E;
		display: inline-block;
		text-align: center;
		color: #FFFFFF;
		font-weight: 500;
		float: right;
	}
</style>