<template>
	<div>
		<div class="shop-order-container container" id="shop-cart">
			<div class="shop-order-tip" v-if="showTip">
				<h4>空空如也<router-link to="/WXVueApp/">去逛逛~</router-link></h4>
			</div>
			<div class="shop-order-list" v-else="!showTip">
				<ul>
					<li v-for="(shopOrder, index) in shopOrderList" :key="shopOrder.id">
						<div>
							<div class="shop-order-type">
								<img src="../../../static/images/icon-store.png"><span>泊心风物</span></img>
								<p @click="deleteOrder(index)">删除</p>
							</div>
							<div class="shop-order-unsale" v-if="shopOrder.status=='下架'">
								<img src="../../../static/images/icon-unsale.png" />
							</div>
							<div class="shop-order-content">
								<div class="shop-order-checkbox">
									<label class="input-check-bg" :class="{'input-check-bg-checked' : shopOrder.checked }" @click="checkItem(index)"></label>
								</div>
								<div class="shop-order-message">
									<img :src="shopOrder.image" @click="gotoProductDetail(index)" />
									<div class="shop-order-product-name" @click="gotoProductDetail(index)">
										<p>{{shopOrder.name}}</p>
										<p>{{shopOrder.standard}}</p>
									</div>
									<div class="shop-order-cost">
										<div class="shop-order-product-count">
											<button @click="subCount(index)"><i class="icon-minus"></i></button>
											<p>{{shopOrder.count}}</p>
											<button @click="addCount(index)"><i class="icon-plus"></i></button>
										</div>
										<div class="shop-order-product-price">
											<p>￥{{shopOrder.total}}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<footer class="shop-order-footer"> 
				<div class="shop-order-all-check">
					<label id="check-all" class="input-check-bg" 
						@click="checkAll()"
						:class="{'input-check-bg-checked' : allChecked }">
					</label>
					<p>全选</p>
				</div>
				<div class="shop-order-pay" @click="submitOrder()">
					<p>结算</p>
				</div>
				<div class="shop-order-total">
					<p>合计: {{total}}</p>
					<p class="shop-order-total-p-height">不含运费</p>
				</div>
			</footer>
		</div>
		<toast :show="showToastTip" :message="tip"></toast>
		<dialogWindow :showDialog="showDia" :message="msg" :title="diaTitle">
			<div slot="dialog-footer">
				<p class="dialog-button-left" @click="dismiss()">取消</p>
				<p class="dialog-button-right" @click="confirm()">确定</p>
			</div>
		</dialogWindow>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import toast from '../../components/common/toast'
	import dialogWindow from '../../components/common/dialog'
	export default {
		data () {
			return {
				allChecked: false,
				showToastTip: false,
				showDia: false,
				msg: "",
				tip: "",
				diaTitle: "提示",
				delIndex: 0,
				shopOrderList: []
			}
		},
		created() {
			this.initShopOrder();
		},
		components: {
			toast,dialogWindow
		},
		computed: {
			total(){
				var item = null;
				var totalPrice = 0;
				for(var i=0;i<this.shopOrderList.length;++i){
					item = this.shopOrderList[i];
					if(item.checked){
						totalPrice += parseFloat(item.price) * parseInt(item.count);
					}
				}
				return totalPrice.toFixed(2);
			},
			showTip(){
				if(this.shopOrderList.length == 0){
					return true;
				}
				return false;
			}
		},
		methods: {
			...mapMutations([
				"ADD_ORDER", "CLEAR_ORDER"
			]),
			initShopOrder(){
				var self = this;
				var data = {"userToken": $.cookie("user_token")};
				requestOnce(requestUrl + "/product/shopitem", "POST", data, true,
					function(data){
						var len = data.size;
						var items = data.rows;
						for(var i=0;i < len;++i){
							var item = {
								"id": items[i].id,
								"pId": items[i].pid,
								"pno": items[i].pno,
								"sId": items[i].sid,
								"name": items[i].name,
								"imgname": items[i].imgurl,
								"image": imageUrl + items[i].imgurl,
								"standard": items[i].standard,
								"count": items[i].count,
								"price": items[i].price,
								"status": items[i].status,
								"total": (parseFloat(items[i].price) * parseInt(items[i].count)).toFixed(2),
								"checked": false
							}
							self.shopOrderList.push(item);
						}
					},
					function(){
						showToast("服务器错误~~");
					}
				);
			},
			subCount(index){  //增加产品数量
				if(this.shopOrderList[index].count > 1){
					this.shopOrderList[index].count--;
					var pTotal = this.shopOrderList[index].price * this.shopOrderList[index].count;
					this.shopOrderList[index].total = pTotal.toFixed(2);
				}
			},
			addCount(index){  //减少产品数量
				if(this.shopOrderList[index].count < 100){
					this.shopOrderList[index].count++;
					var pTotal = this.shopOrderList[index].price * this.shopOrderList[index].count;
					this.shopOrderList[index].total = pTotal.toFixed(2);
				}else{
					this.showToast("达到一次购买上限");
				}
			},
			gotoProductDetail(index){  //跳转产品详情
				if(this.shopOrderList[index].status == "下架"){
					this.showToast("该商品已下架");
					return;
				}
				this.$router.push({path: "/WXVueApp/product/" + this.shopOrderList[index].pno});
			},
			checkAll(){  //选中所有购物车中的产品
				if (!this.allChecked){
					this.allChecked = true;
					for(var i = 0;i < this.shopOrderList.length;++i){
						if(this.shopOrderList[i].status != "下架"){
							this.shopOrderList[i].checked = true;
						}
					}
				}else{
					this.allChecked = false;
					for(var i = 0;i < this.shopOrderList.length;++i){
						this.shopOrderList[i].checked = false;
					}
				}
			},
			checkItem(index){  //选中某个购物车中的产品
				if(this.shopOrderList[index].status == "下架"){
					this.showToast("该商品已下架");
					return;
				}
				if(!this.shopOrderList[index].checked){
					this.shopOrderList[index].checked = true;
				} else {
					this.shopOrderList[index].checked = false;
				}
				this.updateState();
			},
			updateState(){   //检查产品状态，更新数据
				var checkAll = true;
				for(var i = 0;i < this.shopOrderList.length;++i){
					var pTotal = parseFloat(this.shopOrderList[i].total);
					if(!this.shopOrderList[i].checked){
						checkAll = false;
						break;
					}	
				}
				this.allChecked = checkAll;
			},
			deleteOrder(index){  //删除购物车产品
				this.showDia = true;
				this.msg = "是否删除该商品？";
				this.delIndex = index;
			},
			submitOrder(){
				this.CLEAR_ORDER();
				var choosed = false;
				for(var i=0;i < this.shopOrderList.length;++i){
					if(this.shopOrderList[i].checked){
						choosed = true;
						this.ADD_ORDER(this.shopOrderList[i]);
					}
				}
				if(!choosed){
					this.showToast("请选择购买的商品");
					return;
				}
				this.$router.push("/WXVueApp/order");
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showToastTip = true;
				setTimeout(function(){
					self.showToastTip = false;
				},2000);
			},
			dismiss(){
				this.showDia = false;
			},
			confirm(){
				var self = this;
				var data = {"id": this.shopOrderList[this.delIndex].id};
				requestOnce(requestUrl + "/product/del-shop", "POST", data, true,
					function(data){
						self.shopOrderList.splice(self.delIndex,1);
						self.showToast("已移除购物车商品");
					},
					function(){
						self.showToast("服务器出错了~~");
					}
				);
				this.showDia = false;
			}
		}
	}
</script>

<style>
	/*
	 * 购物车页面样式
	 * */
	.shop-order-container {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	
	.shop-order-tip {
		text-align: center;
	}
	
	.shop-order-tip a {
		text-decoration: none;
	}
	
	.shop-order-tip h4 {
		font-size: 16px;
	}
	
	/*
	 * 购物车产品列表
	 * */
	.shop-order-list {
		width: 100%;
		height: auto;
		margin-bottom: 50px;
	}
	
	.shop-order-list ul {
		width: 100%;
		list-style: none;
		padding: 0;
	}
	
	.shop-order-list ul li {
		width: 100%;
		height: auto;
		padding: 2%;
		background-color: #FFFFFF;
		box-shadow: 1px 1px #CCCCCC;
		border-radius: 5px;
	}
	
	.shop-order-unsale {
		width: auto;
		display: inline;
		z-index: -100;
	}
	
	.shop-order-unsale img {
		position: absolute;
		left: 45%;
		display: inline-block;
		width: auto;
		height: 65px;
	}
	
	.shop-order-type {
		width: 100%;
		height: auto;
		text-align: left;
	}
	
	.shop-order-type p {
		display: inline-block;
		font-size: 16px;
		color: #269ABC;
		float: right;
		margin-left: 5%;
	}
	
	.shop-order-type img {
		width: 16px;
		height: 16px;
	}
	
	.shop-order-content {
		width: auto;
		height: auto;
		margin-top: 2%;
	}
	
	.shop-order-checkbox {
		width: 8%;
		height: auto;
		float: left;
		margin-top: 2%;
	}
	
	.shop-order-message {
		width: 92%;
		height: auto;
		display: inline-block;
	}
	
	.shop-order-message img {
		width: 75px;
		height: 75px;
		max-width: 25%;
		float: left;
	}
	
	.shop-order-product-name {
		width: 40%;
		max-width: 40%;
		display: inline-block;
		margin-left: 3%;
		text-align: left;
	}
	
	.shop-order-product-name p {
		font-size: 15px;
		padding: 5px;
	}
	
	.shop-order-cost {
		width: 30%;
		max-width: 30%;
		display: inline-block;
		padding: 0;
		float: right;
	} 
	
	.shop-order-cost p {
		display: inline-block;
	}
	
	.shop-order-product-count p {
		width: 30%;
		max-width: 30%;
		height: 30px;
		text-align: center;
		font-size: 18px;
	}
	
	.shop-order-product-count button {
		width: 25px;
		max-width: 30%;
		height: 25px;
		background-color: rgba(255,255,255,.5);
		border: 1px solid #CCCCCC;
	}
	
	.shop-order-product-count p:active {
		background-color: #CCCCCC;
	}
	
	.shop-order-product-price p {
		max-width: 90%;
		font-size: 16px;
	}
	
	/*
	 * 购物车页面footer
	 * */
	.shop-order-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 50px;
		display: inline-block;
		background: #ffffff;
	}
	
	.shop-order-all-check {
		max-width: 28%;
		display: inline-block;
		margin-left: 10px;
		margin-top: 15px;
		float: left;
	}
	
	.shop-order-all-check p {
		width: auto;
		font-size: 15px;
		display: inline-block;
		margin-left: 5px;
	}
	
	.shop-order-total {
		position: absolute;
		bottom: 0;
		right: 33%;
		max-width: 40%;
		height: auto;
	}
	
	.shop-order-total p {
		width: auto;
		max-width: 100%;
		font-size: 14px;
		padding: 0;
	}
	
	.shop-order-total-p-height {
		height: 10px;
	}
	
	.shop-order-pay {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 30%;
		max-width: 30%;
		height: 50px;
		background-color: #D9534F;
		display: inline-block;
		text-align: center;
	}
	
	.shop-order-pay p {
		width: auto;
		line-height: 50px;
		color: #FFFFFF;
		font-size: 18px;
	}
	
	/*
	 * checkbox样式
	 * */
	.input-check-bg {
		width: 20px;
		height: 20px;
		display: inline-block;
		float: left;
		background: url(../../../static/images/icon-unchecked.svg) no-repeat;
		background-size: 20px 20px;
	}
	
	.input-check-bg-checked {
		background: url(../../../static/images/icon-checked.svg) no-repeat;
		background-size: 20px 20px;
	}
</style>