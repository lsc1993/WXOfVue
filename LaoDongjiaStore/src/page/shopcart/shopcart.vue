<template>
	<div class="shop-wrapper">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="shopcart-container">
			<div class="container">
				<h4>购物车</h4>
				<div class="shopcart-list-container">
					<div class="shopcart-list-title hidden-xs">
						<div class="row">
							<div class="col-md-2 col-sm-2">
								<label class="input-check-bg" 
									:class="{'input-check-bg-checked' : allChecked }"
									@click="checkAll()">全选</label>
							</div>
							<div class="col-md-4 col-sm-4 title-align-left">
								<p>商品名称</p>
							</div>
							<div class="col-md-1 col-sm-1">
								<p>单价</p>
							</div>
							<div class="col-md-2 col-sm-2">
								<p>数量</p>
							</div>
							<div class="col-md-1 col-sm-1">
								<p>小计</p>
							</div>
							<div class="col-md-1 col-sm-1">
								<p>操作</p>
							</div>
						</div>							
					</div>
					<div class="shopcart-empty-tip" v-show="showTip">
						<img src="../../../static/images/icon-shop-basket.png" />
						<p>您的购物城还没有商品，去逛逛吧！</p>
						<button @click="gotoShop()">去逛逛</button>
					</div>
					<div class="shopcart-list-content" v-show="!showTip">
						<div>
							<ul>
								<li v-for="(item, index) in shopList">
									<div class="row">
										<div class="product-unsale-tip" v-if="item.status == '下架'">
											<img src="../../../static/images/icon-unsale.png" />
										</div>
										<div class="col-md-2 col-sm-2">
											<label class="input-check-bg" 
												:class="{'input-check-bg-checked' : item.checked }" 
												@click="checkItem(index)">选择</label>
										</div>
										<div class="col-md-4 col-sm-4 title-align-left">
											<div class="shopcart-item-desc">
												<img :src="item.pImg" />
												<p>{{item.name}}</p>
											</div>
										</div>
										<div class="col-md-1 col-sm-1">
											<p>￥{{item.price}}</p>
										</div>
										<div class="col-md-2 col-sm-2">
											<div class="shopcart-counter">
												<img src="../../../static/images/icon-plus.png" @click="addCount(index)" />
												<p>{{item.count}}</p>
												<img src="../../../static/images/icon-minus.png" @click="subCount(index)" />
											</div>
										</div>
										<div class="col-md-1 col-sm-1">
											<p>￥{{item.total}}</p>
										</div>
										<div class="col-md-1 col-sm-1">
											<p class="shopcart-operator-text">删除</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="shopcart-list-footer">
						<div class="row">
							<div class="col-md-2 col-sm-2 col-xs-3">
								<label class="input-check-bg"
									:class="{'input-check-bg-checked' : allChecked }"
									@click="checkAll()">全选</label>
							</div>
							<div class="col-md-1 col-sm-1 col-xs-1">
								<p class="shopcart-operator-text">删除</p>
							</div>
							<div class="col-md-2 col-sm-2 col-xs-3">
								<p class="shopcart-operator-text">清空下架商品</p>
							</div>
							<div class="col-md-2 col-sm-2 col-xs-3 shopcart-item-total">
								<p>合计：</p>
								<p>{{total}}</p>
							</div>
							<div class="col-md-5 col-sm-5 col-xs-6">
								<button class="shopcart-buy-button" @click="submitOrder()">结算</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<storeFooter></storeFooter>
		<toast :show="showToastTip" :message="tip"></toast>
	</div>
</template>

<script>
	import {mapMutations} from "vuex"
	import toast from "../../components/common/toast"
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	export default {
		data () {
			return {
				allChecked: false,
				showToastTip: false,
				tip: "",
				shopList: [
					{
						"pid": 1,
						"pon": "1",
						"name": "玄米茶",
						"price": 120.0,
						"pImg": "../../../static/images/s_w453h453.png",
						"count": 1,
						"total": "120.00",
						"status": "上架",
						"checked": false
					},
					{
						"pid": 1,
						"pon": "1",
						"name": "玄米茶",
						"price": 120.0,
						"pImg": "../../../static/images/s_w453h453.png",
						"count": 1,
						"total": "120.00",
						"status": "下架",
						"checked": false
					},
					{
						"pid": 1,
						"pon": "1",
						"name": "玄米茶",
						"price": 120.0,
						"pImg": "../../../static/images/s_w453h453.png",
						"count": 1,
						"total": "120.00",
						"status": "上架",
						"checked": false
					},
				]
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter, toast
		},
		computed: {
			showTip(){
				if(this.shopList.length == 0){
					return true;
				}
				return false;
			},
			total(){
				var len = this.shopList.length;
				var price = 0;
				for(var i=0;i<len;++i){
					if(this.shopList[i].checked){
						price += parseFloat(this.shopList[i].price) * parseInt(this.shopList[i].count);
					}
				}
				return price.toFixed(2);
			}
		},
		methods: {
			...mapMutations([
				"ADD_ORDER", "CLEAR_ORDER"
			]),
			addCount(index){
				if(this.shopList[index].count < 100){
					this.shopList[index].count++;
					var pTotal = this.shopList[index].price * this.shopList[index].count;
					this.shopList[index].total = pTotal.toFixed(2);
				}else{
					this.showToast(BUY_NUMBER_LIMIT);
				}
			},
			subCount(index){
				if(this.shopList[index].count > 1){
					this.shopList[index].count--;
					var pTotal = this.shopList[index].price * this.shopList[index].count;
					this.shopList[index].total = pTotal.toFixed(2);
				}
			},
			/**
			 * 函数描述：全选按钮，选中所有购物车产品（除下架产品）
			 * @param 
			 * @return
			 */
			checkAll(){  //选中所有购物车中的产品
				if (!this.allChecked){
					this.allChecked = true;
					for(var i = 0;i < this.shopList.length;++i){
						if(this.shopList[i].status != PRODUCT_STATUS_UNSALE){
							this.shopList[i].checked = true;
						}
					}
				}else{
					this.allChecked = false;
					for(var i = 0;i < this.shopList.length;++i){
						this.shopList[i].checked = false;
					}
				}
			},
			/**
			 * 函数描述：选中购物车中产品
			 * @param index 产品下标
			 * @return 
			 */
			checkItem(index){  //选中某个购物车中的产品
				if(this.shopList[index].status == PRODUCT_STATUS_UNSALE){
					this.showToast(PRODUCT_UNSALE_TIP);
					return;
				}
				if(!this.shopList[index].checked){
					this.shopList[index].checked = true;
				} else {
					this.shopList[index].checked = false;
				}
				this.updateState();
			},
			/**
			 * 函数描述：在每次有选中购物车产品动作时，检查当前产品选中状态——是否所有产品都被选中
			 * @param
			 * @return
			 */
			updateState(){   //检查产品状态，更新数据
				var checkAll = true;
				for(var i = 0;i < this.shopList.length;++i){
					var pTotal = parseFloat(this.shopList[i].total);
					if(!this.shopList[i].checked){
						checkAll = false;
						break;
					}	
				}
				this.allChecked = checkAll;
			},
			submitOrder(){
				this.CLEAR_ORDER();
				var hasChoosedProduct = false;
				for (var i = 0;i < this.shopList.length;++i) {
					if (this.shopList[i].checked) {
						this.ADD_ORDER(this.shopList[i]);
						hasChoosedProduct = true;
					}
				}
				if (hasChoosedProduct) {
					this.$router.push("/order");
				} else {
					this.showToast(PLEASE_CHOOSE_PRODUCT);
				}
			},
			gotoShop(){
				this.$router.push("/");
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showToastTip = true;
				setTimeout(function(){
					self.showToastTip = false;
				},2000);
			}
		}
	}
</script>

<style>
	.shop-wrapper {
		position: relative;
		min-height: 100%;
	}
	.shopcart-container {
		position: relative;
		width: 100%;
		padding-bottom: 130px;
	}
	
	.shopcart-container h4 {
		text-align: left;
		font-weight: bold;
	}
	
	.shopcart-list-container {
		border: 1px solid #dfdfdf;
	}
	
	.shopcart-list-title {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #dfdfdf;
	}
	
	.shopcart-list-container p {
		line-height: 50px;
	}
	
	.title-align-left {
		text-align: left;
	}
	
	.check-img {
		width: 25px;
		line-height: 50px;
		display: inline-block;
	}
	
	.product-unsale-tip {
		position: absolute;
		left: 40%;
		z-index: -100;
	}
	
	.product-unsale-tip img {
		width: 80px;
	}
	
	/**
	 * 购物车为空时提示样式
	 * */
	.shopcart-empty-tip {
		height: 600px;
	}
	
	.shopcart-empty-tip img {
		width: 150px;
		margin-top: 100px;
	}
	
	.shopcart-empty-tip p {
		color: #999999;
		font-size: 16px;
	}
	
	.shopcart-empty-tip button {
		width: 90px;
		height: 30px;
		color: #ffffff;
		background: #D40F0F;
		text-decoration: none;
		border: hidden;
		border-radius: 3px;
	}
	
	/**
	 * 购物车产品列表样式
	 * */
	.shopcart-list-content {
		margin-top: 20px;
	}
	
	.shopcart-list-content ul {
		padding: 0;
	}
	
	.shopcart-list-content ul li {
		width: 100%;
		min-height: 100px;
		display: inline-block;
		list-style: none;
		border-bottom: 1px solid #dfdfdf;
		border-top: 1px solid #dfdfdf;
		margin-top: 15px;
		padding-top: 20px;
	}
	
	/** 
	 * 购物车产品描述
	 * */
	.shopcart-item-desc {
		display: table-cell;
		vertical-align: middle;
	}
	
	.shopcart-item-desc p {
		display: inline-block;
	}
	
	.shopcart-item-desc img {
		width: 60px;
	}
	
	/** 
	 * 购物车产品计数
	 * */
	.shopcart-counter {
		width: auto;
		height: 30px;
		display: inline-block;
		margin: 10px auto;
		border: 1px solid #dfdfdf;
	}
	
	.shopcart-counter p {
		margin-left: 10px;
		margin-right: 10px;
		line-height: 30px;
		display: inline-block;
	}
	
	.shopcart-counter img {
		width: 15px;
		display: inline-block;
		margin: 5px;
	}
	
	/**
	 * 购物车结算金额
	 * */
	.shopcart-list-footer {
		width: 100%;	
		min-height: 80px;
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px solid #dfdfdf;
	}
	
	.shopcart-item-total p {
		display: inline-block;
	}
	
	.shopcart-buy-button {
		width: 45%;
		height:45px;
		color: #ffffff;
		background: #d40f0f;
		border: hidden;
		border-radius: 5px;
		margin-left: 10%;
	}
	
	/**
	 * 购物车操作text样式
	 * */
	.shopcart-operator-text:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	/*
	 * checkbox样式
	 * */
	.input-check-bg {
		width: 60px;
		line-height: 50px;
		display: inline-block;
		margin: 0 auto;
		background: url(../../../static/images/icon-unchecked.svg) no-repeat;
		background-size: 25px 25px;
		background-position-y: 12px;
		text-align: right;
		font-weight: 400;
	}
	
	.input-check-bg-checked {
		background: url(../../../static/images/icon-checked.svg) no-repeat;
		background-size: 25px 25px;
		background-position-y: 12px;
	}
</style>