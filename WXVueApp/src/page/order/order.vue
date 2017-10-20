<template>
	<div>
		<div class="address-container" @click="chooseAddress()">
			<div class="container">
				<div class="row address-choose-container" v-show="!showAddress">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<img src="../../../static/images/address-palce.svg" />
					</div>
					<div class="col-md-9 col-sm-9 col-xs-8">
						<p>选择收获地址</p>
					</div>
					<div class="col-md-1 col-sm-1 col-xs-1">
						<i class="icon-angle-right icon-2x"></i>
					</div>
				</div>
				<div class="address-content" v-show="showAddress">
					<div class="address-icon">
						<input type="radio" />
					</div>
					<div class="address-message">
						<div class="address-user-message">
							<p>{{addressMessage.name}}</p>
							<p>{{addressMessage.tel}}</p>
						</div>
						<div class="address-user-addr">
							<p>收货地址：{{addressMessage.address}}</p>
						</div>
					</div>
					<div class="address-choose-icon">
						<i class="icon-angle-right icon-large"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="store-name">
			<div class="container">
				<i class="icon-home"></i>
				<p>泊心风物</p>
			</div>
		</div>
		<div>
			<div class="order-message" v-show="singleOrder">
				<div class="container order-message-container">
					<div class="row">
						<div class="col-md-4 col-sm-4 col-xs-4">
							<img :src="loadOrders.image" />
						</div>
						<div class="col-md-5 col-sm-5 col-xs-5">
							<p class="font-size-medium">{{loadOrders.name}}</p>
							<p class="font-size-medium">{{loadOrders.standard}}</p>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-3">
							<p class="font-size-medium">{{loadOrders.price}}</p>
							<div class="product-count">
								<p class="font-size-medium">{{loadOrders.count}}</p>
								<p>X</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container" v-show="!singleOrder">
				<div class="order-multi-container">
					<div class="order-multi-list" @click="gotoShopCart()">
						<div class="order-multi-angle">
							<li class="icon-angle-right icon-2x"></li>
						</div>
						<ul>
							<li v-for="item in loadOrders" :key="item.id">
								<img :src="item.image" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="delivery-way">
			<div class="container">
				<p class="delivery-left-p">配送方式</p>
				<p class="delivery-right-p">快递发货</p>
			</div>
		</div>
		<div id="buy-message-container" class="buyer-message">
			<div class="container">
				<p class="buy-message-p">买家留言：</p>
				<textarea id="buy-message" class="textaera-div"></textarea>
			</div>
		</div>
		<div class="favoravle-container">
			<div class="container">
				<p>优惠</p>
				<div class="favoravle-tab">
					<p>使用优惠</p>
					<i class="icon-angle-right"></i>
				</div>
			</div>
		</div>
		<div class="order-total">
			<div class="container">
				<div class="product-price-content">
					<p>商品金额</p>
					<div class="product-price">
						<p>￥</p>
						<p>{{pTotal}}</p>
					</div>
				</div>
				<div class="delivery-price-content">
					<p>运费</p>
					<div class="delivery-price">
						<p>+￥</p>
						<p>{{deliveryCost}}</p>
					</div>
				</div>
			</div>
		</div>
		<footer>
			<div class="order-footer">
				<div id="submit-order-btn" class="order-submit" @click="payOrder()">
					<p>提交订单</p>
				</div>
				<div class="order-total-cost">
					<p class="font-size-medium">合计：</p>
					<p>{{totalCost}}</p>
				</div>
			</div>
		</footer>
		<addrList :show="showAddrList" @close="removeAddrWindow()"></addrList>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import addrList from '../address/addressList'
	export default {
		data () {
			return {
				orderType: -1,
				singleOrder: true,
				showAddrList: false,
				showAddress: false,
				orders:[],
				address: {}
			}
		},
		created(){
			
		},
		mounted(){
			this.autoHeightTextaera();  //此方法在created内调用无效
		},
		components: {
			addrList
		},
		computed: {
			...mapState([
				"orderList","addrTemp"
			]),
			loadOrders(){
				this.orders = this.orderList;
				if(this.orders.length == 1){
					this.orderType = 0;
					this.singleOrder = true;
					return this.orders[0];
				}else if(this.orders.length > 1){
					this.orderType = 1;
					this.singleOrder = false;
					return this.orders;
				}else{
					alert("订单信息出错");
					return this.orders;
				}
			},
			addressMessage(){
				this.address = this.addrTemp;
				if(this.address.name != undefined && this.address.tel != undefined && this.address.address != undefined){
					this.showAddress = true;
					this.showAddrList = false;
				}else {
					this.showAddress = false;
				}
				return this.address;
			},
			totalCost: function(){
				var price = 0;
				if(this.orderType == 0){
					price = parseFloat(this.orders[0].price) * parseInt(this.orders[0].count);
				}else if(this.orderType == 1){
					var len = this.orders.length;
					for(var i=0;i < len;++i){
						var item = this.orders[i];
						var count = item.count;
	 					price += (parseFloat(item.price) * parseInt(count));
					}
				}
				price += this.deliveCost;
				return price.toFixed(2);
			},
			pTotal: function(){
				var price = 0; 
				if(this.orderType == 0){
					price = parseFloat(this.orders[0].price) * parseInt(this.orders[0].count);
				}else if(this.orderType == 1){
					var len = this.orders.length;
					for(var i=0;i < len;++i){
						var item = this.orders[i];
						var count = item.count;
	 					price += (parseFloat(item.price) * parseInt(count));
					}
				}
				return price.toFixed(2);
			},
			deliveryCost: function(){
				var price = parseFloat(this.pTotal);
				if(price > 88){
					this.deliveCost = 0;
				}else{
					this.deliveCost = 6;
				}
				var cost = this.deliveCost; 
				return cost.toFixed(2);
			}
		},
		methods: {
			chooseAddress(){
				this.showAddrList = true;
			},
			removeAddrWindow(){
				this.showAddrList = false;
			},
			payOrder(){
				
			},
			autoHeightTextaera(){ //买家留言输入框高度伸展
				$("#buy-message").focus(function(){
					$("#buy-message").animate({height:"80px"},200);
				});
				$("#buy-message").blur(function(){
					$("#buy-message").animate({height:"30px"},200);	
				});
			}
		}
	}		
</script>

<style>
	.address-container {
		position: fixed;
		top: 0;
		width: 100%;
		height: auto;
		background-color: #CCCCCC;
	}
	
	.address-choose-container {
		width: auto;
		height: 50px;
		text-align: left;
	}
	
	.address-choose-container p {
		width: auto;
		line-height: 40px;
		font-size: 16px;
		font-weight: 400;
		padding-top: 10px;
	}
	
	.address-choose-container i {
		line-height: 50px;
	}
	
	.address-choose-container img {
		width: 25px;
		height: 25px;
		margin-top: 18px;
		float: left;
	}
	
	.address-content {
		position: relative;
		display: table;
		margin-top: 10px;
	}
	
	.address-icon {
		width: 10%;
		display: table-cell;
		vertical-align: middle;
		text-align: left;
	}
	
	.address-message {
		width: 80%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		
	}
	
	.address-user-message p {
		width: auto;
		line-height: 18px;
		font-size: 15px;
		float: left;
	}
	
	.address-user-addr p {
		width: auto;
		line-height: 15px;
		font-size: 13px;
		float: left;
	}
	
	.address-choose-icon {
		width: 5%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		text-align: right;
	}
	
	.store-name {
		height: 45px;
		padding: 1px;
		text-align: left;
	}
	
	.store-name i,p {
		line-height: 40px;
		display: inline-block;
	}
	
	.order-message {
		border-bottom: 1px solid #CCCCCC;
		text-align: right;
	}
	
	.order-message-container {
		margin-bottom: 5px;
	}
	
	.order-message img {
		width: 80px;
		height: 80px;
		float: left;
	}
	
	.order-message p {
		height: auto;
		display: block;
	}
	
	.order-multi-container {
		width: 100%;
		display: table;
	}
	
	.order-multi-list {
		width: 300px;
		height: 100px;
		display: table-cell;
		vertical-align: middle;
		overflow-x: scroll;
	}
	
	.order-multi-list::-webkit-scrollbar {
		display: none;
	}
	
	.order-multi-list ul {
		width: 320px;
		height: 80px;
		list-style: none;
		padding: 0;
		white-space: nowrap;
	}
	
	.order-multi-list ul li {
		display: inline-block;
		margin-right: 2%;
	}
	
	.order-multi-container img {
		width: 75px;
		height: 75px;
	}
	
	.order-multi-angle {
		width: 30px;
		height: 30px;
		text-align: center;
		margin-top: 40px;
		float: right;
	}
	
	.product-count p {
		float: right;
	}
	
	.delivery-way {
		height: 55px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.delivery-left-p  {
		width: auto;
		line-height: 55px;
		float: left;
	}
	
	.delivery-right-p {
		width: auto;
		line-height: 55px;
		float: right;
	}
	
	.buyer-message {
		padding: 0;
		height: auto;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.buy-message-p {
		width: auto;
		line-height: 30px;
		float: left;
	}
	
	.textaera-div {
		width: 100%;
		height: 30px;
		display: block;
		margin-bottom: 5px;
		border: 1px solid #67B168;
		overflow-y: auto;
	}
	
	.favoravle-container {
		height: 55px;
		margin-top: 5%;
		text-align: left;
	}
	
	.favoravle-container p {
		line-height: 55px;
		display: inline-block;
	}
	
	.favoravle-tab {
		display: inline-block;
		float: right;
	}
	
	.product-price-content {
		width: 100%;
		height: 50px;
		display: inline-block;
		text-align: left;
	}
	
	.order-total {
		margin-top: 5%;
		margin-bottom: 60px;
	}
	
	.product-price-content p {
		width: auto;
		line-height: 50px;
	}
	
	.product-price {
		display: inline-block;
		float: right;
	}
	
	.delivery-price-content {
		width: 100%;
		height: 50px;
		display: inline-block;
		text-align: left;
	}
	
	.delivery-price-content p {
		width: auto;
		line-height: 50px;
	}
	
	.delivery-price {
		display: inline-block;
		float: right;
	}
	
	.order-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 55px;
	}
	
	.order-total-cost {
		display: inline-block;
		float: right;
		margin-right: 2%;
	}
	
	.order-total-cost p {
		width: auto;
		line-height: 55px;
	}
	
	.order-submit {
		width: 33%;
		height: 55px;
		display: inline-block;
		background-color: #D9534F;
		text-align: center;
		float: right;
	}
	
	.order-submit p {
		width: auto;
		line-height: 55px;
		color: #FFFFFF;
	}
	
	.font-size-small {
		font-size: small;
	}
	
	.font-size-medium {
		font-size: medium;
	}
	
	.font-size-large {
		font-size: large;
	}
</style>