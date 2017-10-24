<template>
	<div>
		<transition name="popup">
			<div class="popup-window-modal-mask" v-if="show">
				<div class="popup-window-modal-wrapper">
					<div class="popup-window-modal-container">
						<div class="product-detail container">
							<div class="row">
								<div class="product-img-pop col-md-2 col-sm-2 col-xs-3">
									<img :src="loadProduct.imgIndex" />
								</div>
								<div class="product-price-name col-md-9 col-sm-9 col-xs-7">
									<p>{{loadProduct.name}}</p>
									<p>{{loadProduct.price}}</p>
								</div>
								<div class="product-pop-remove col-md-1 col-sm-1 col-xs-1">
									<button @click="$emit('close')"><i class="icon-remove"></i></button>
								</div>
							</div>
						</div>
						<div class="product-standard-pop">
							<p>规格:</p>
							<div class="product-standard-ul">
								<ul>
									<li v-for="(std,index) in loadProduct.standards" 
										:key="std.id" 
										@click="chooseStandard(index)" 
										:class="{'product-standard-choosed' : std.isChoosed, 'product-standard-unchoosed' : !std.isChoosed}">
										{{std.standard}}
									</li>
								</ul>
							</div>
						</div>
						<div class="product-sale-count">
							<p class="product-sale-count-p">数量:</p>
							<div class="product-count-caculator">
								<p @click="subCount()">-</p>
								<p>{{product.count}}</p>
								<p @click="addCount()">+</p>
							</div>
						</div>
						<div class="product-operator">
							<div id="add-cart-btn" class="product-add-shopcart product-operator-half-width" @click="addShopCart()">
								<p>加入购物车</p>
							</div>
							<div class="product-buy-now product-operator-half-width" @click="buyNow()">
								<p>购买</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<toast :show="showTip" :message="tip"></toast>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import toast from '../../components/common/toast'
	export default {
		data () {
			return {
				showTip: false,
				tip: "",
				product: {}
			}
		},
		props: {
			showWindow: {
				type: Boolean,
				default: false
			}
		},
		components: {
			toast
		},
		computed: {
			...mapState([
				"productDetail"
			]),
			loadProduct(){
				this.product = this.productDetail;
				return this.product;
			},
			show(){
				return this.showWindow;
			}
		},
		methods: {
			...mapMutations([
				"ADD_ORDER", "CLEAR_ORDER"
			]),
			chooseStandard(index){
				var length = this.product.standards.length;
				for(var i = 0;i < length;++i){
					var std;
					if(i == index){
						this.product.standards[i].isChoosed = true;
						this.product.price = this.product.standards[i].price;
					} else {
						this.product.standards[i].isChoosed = false;
					}
				}
			},
			addCount(){
				if(this.product.count < 100){
					this.product.count++;
				}else{
					this.showToast("不能买更多了~");
				}
			},
			subCount(){
				if(this.product.count > 1){
					this.product.count--;
				}
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showTip = true;
				setTimeout(function(){
					self.showTip = false;
				},2000);
			},
			addShopCart(){
				this.showToast("请选择规格");
			},
			buyNow(){
				var std,standard,price,sid,isChooseStd;
				isChooseStd = false;
				for(var i=0;i<this.product.standards.length;++i){
					std = this.product.standards[i];
					if(std.isChoosed){
						sid = std.sid;
						price = std.price;
						standard = std.standard;
						isChooseStd = true;
						break;
					}
				}
				if(!isChooseStd){
					this.showToast("请选择规格");
					return;
				}
				var order = {
					"pId": this.product.pId,
					"image": this.product.imgIndex,
					"name": this.product.name,
					"sid": sid,
					"price": price,
					"count": this.product.count,
					"standard": standard
				};
				this.CLEAR_ORDER();
				this.ADD_ORDER(order);
				this.$router.push("/order");
			}
		}
	}
</script>

<style>
	/**
	 * popupwindow外部底部样式
	 */
	.popup-window-modal-mask {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.5);
		display: table;
	    transition: opacity .2s ease;
		-webkit-transition: .2s ease;
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
		transition: all .2s ease;
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
	
	.product-img-pop img {
		width: 100%;
		height: 100%;
	}
	
	.product-price-name p {
		font-size: 15px;
		margin-top: 5px;
		text-align: left;
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
	
	.product-standard-pop p {
		text-align: left;
		margin-left: 2%;
	}
	
	.product-standard-ul ul {
		list-style: none;
		padding: 0;
		text-align: left;
		margin-left: 2%;
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
		width: 100%;
		height: auto;
		display: inline-block;
		padding: 2% 2% 1% 3%;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-sale-count p {
		width: auto;
		line-height: 30px;
		font-size: 16px;
		display: inline-block;
	}
	
	.product-sale-count-p {
		margin-left: 2%;
		float: left;
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
		display: inline-block;
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
	/*
	 * popupwindow动画
	 * */
	.popup-enter-active, .popup-leave-active{
		opacity: 0;
		transform: translateY(40%);
		-webkit-transform: translateY(40%);
	}
</style>