<template>
	<div class="order-wrapper1">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="order-container">
			<div class="container">
				<h4>提交订单</h4>
				<div class="order-wrapper">
					<div class="address-container">
						<img src="../../../static/images/icon-order-address.png" />
						<h5>收货信息</h5>
						<div class="order-address-message">
							<div class="order-address-describe">
								<div class="order-address-name">
									<p>{{loadAddr.name}}</p>
									<p>{{loadAddr.tel}}</p>
								</div>
								<div class="order-address-detail">
									<p>{{loadAddr.province}}</p>
									<p>{{loadAddr.city}}</p>
									<p>{{loadAddr.region}}</p>
									<p>{{loadAddr.address}}</p>
								</div>
							</div>
						</div>
						<div class="address-choose-container">
							<button @click="chooseAddr()">选择收货地址</button>
						</div>
					</div>
					<div class="order-list-container">
						<div class="order-list-title">
							<img src="../../../static/images/icon-order-list.png" />
							<h5>购物清单</h5>
						</div>
						<div class="order-list-item">
							<ul>
								<li v-for="(item, index) in loadOrder">
									<div class="row">
										<div class="col-md-4 com-sm-4 col-xs-4">
											<div class="order-item-desc">
												<img :src="item.image" />
												<p>{{item.name}}</p>
											</div>
											
										</div>
										<div class="col-md-4 col-sm-4 col-xs-4">
											<div class="order-item-price">
												<p>￥{{item.price}}</p>
												<p>x{{item.count}}</p>
											</div>
										</div>
										<div class="col-md-4 col-sm-4 col-xs-4">
											<div class="order-item-total">
												<p class="text-bold">总计：￥{{item.total}}</p>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="order-list-message">
						<div class="order-list-title">
							<img src="../../../static/images/icon-message.png" />
							<h5>留言</h5>
						</div>
						<inputAutoFit :inputId="'order-message'" :inputType="'text'"
							:tipId="'order-message-tip'" :tipText="'买家留言'"
							class="order-message"></inputAutoFit>
					</div>
					<div class="order-list-summary">
						<div class="order-cost-summary">
							<div class="order-summary-text">
								<p>商品总金额：</p>
								<p>运费合计：</p>
								<p>应付总额：</p>
							</div>
							<div class="order-summary-cost">
								<p>￥{{pTotal}}</p>
								<p>￥{{deliveryCost}}</p>
								<p class="text-bold-color">￥{{total}}</p>
							</div>
						</div>
						<div class="order-submit-container">
							<div class="order-submit-button">
								<button>提交订单</button>
							</div>
							<div class="order-receive-message hidden-xs">
								<div class="order-address">
									<p class="text-bold">寄送至：</p>
									<p>{{loadAddr.province}}</p>
									<p>{{loadAddr.city}}</p>
									<p>{{loadAddr.region}}</p>
									<p>{{loadAddr.address}}</p>
								</div>
								<div class="order-receiver">
									<p class="text-bold">收货人：</p>
									<p>{{loadAddr.name}}</p>
									<p>{{loadAddr.tel}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<storeFooter></storeFooter>
		<addrList :show="showAddrList" @close="removeAddrWin()"></addrList>
		<dialogTip :show="showDialog" :title="diaTitle" :content="diaContent"
			 @close="removeDialog()" @confirm="removeDialog()"></dialogTip>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import dialogTip from "../../components/common/dialog"
	import inputAutoFit from "../../components/common/inputAutoFit"
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	import addrList from "../address/addressList"
	export default {
		data () {
			return {
				showDialog: false,
				diaTitle: "提示",
				diaContent: "",
				showAddrList: false,
				address: {},
				orders: []
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter, addrList, dialogTip, inputAutoFit
		},
		computed: {
			...mapState([
				"addrTemp", "orderList"
			]),
			loadAddr(){
				this.address = this.addrTemp;
				return this.address;
			},
			loadOrder(){
				this.orders = this.orderList;
				var len = this.orders.length;
				if(len <= 0 || len == undefined){
					this.showDialogWin("没有订单信息，请重新下单");
				}
				return this.orders;
			},
			total(){
				var cost = 0;
				cost = parseFloat(this.pTotal) + parseFloat(this.deliveryCost);
				return cost.toFixed(2);
			},
			pTotal(){
				var len = this.orderList.length;
				var cost = 0;
				for(var i=0;i < len;++i){
					cost += parseFloat(this.orderList[i].total);
				}
				return cost.toFixed(2);
			},
			deliveryCost(){
				var cost = 0;
				if(parseFloat(this.pTotal) < 100){
					cost = 8;
				}
				return cost.toFixed(2);
			}
		},
		methods: {
			chooseAddr(){
				this.showAddrList = true;
			},
			showDialogWin(content){
				this.showDialog = true;
				this.diaContent = content;
			},
			removeAddrWin(){
				this.showAddrList = false;
			},
			removeDialog(){
				this.showDialog = false;
			}
		}
	}
</script>

<style>
	.order-wrapper1 {
		position: relative;
		min-height: 100%;
	}
	
	.order-container {
		position: relative;
		width: 100%;
		padding-bottom: 130px;
	}
	
	.order-container h4 {
		text-align: left;
		font-weight: 500;
		font-size: 22px;
	}
	
	.order-wrapper {
		width: 100%;
		border: 1px solid #cccccc;
	}
	
	/**
	 * 订单地址操作样式
	 * */
	.address-container {
		padding-left: 40px;
		text-align: left;
		margin-bottom: 20px;
		border-bottom: 1px solid #cccccc;
	}
	
	.address-container img {
		width: 25px;
		display: inline-block;
	}
	
	.address-container h5 {
		display: inline-block;
	}
	
	.address-choose-container button {
		width: 120px;
		height: 30px;
		margin-top: 10px;
		margin-bottom: 20px;
		background: #d40f0f;
		color: #ffffff;
		border: hidden;
		border-radius: 3px;
	}
	
	/**
	 * 订单地址选择样式
	 * */
	.order-address-message {
		position: relative;
		display: table;
		text-align: left;
		margin-top: 10px;
	}
	
	.order-address-describe {
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-address-name p {
		display: inline-block;
	}	
	
	.order-address-detail p {
		display: inline-block; 
	}
	
	/**
	 * 购物清单样式
	 * */
	.order-list-container {
		width: 100%;
		margin-bottom: 20px;
		border-bottom: 1px solid #cccccc;
	}
	
	.order-list-title {
		padding-left: 40px;
		text-align: left;
	}
	
	.order-list-title img {
		width: 20px;
		display: inline-block;
	}
	
	.order-list-title h5 {
		display: inline-block;
	}
	
	/**
	 * 订单列表样式
	 * */
	.order-list-item {
		width: 100%;
		margin-top: 10px;
		padding-left: 40px;
	}
	
	.order-list-item ul {
		padding: 0;
	}
	
	.order-list-item ul li {
		width: 100%;
		padding-right: 5%;
		list-style: none;
		display: inline-block;
		text-align: left;
	}
	
	.order-item-desc img {
		width: 90px;
		display: inline-block;
	}
	
	.order-item-desc p {
		display: inline-block;
		font-size: 15px;
	}
	
	.order-item-price {
		width: 100%;
		display: inline-block;
		margin-top: 20px;
		text-align: right;
	}
	
	.order-item-price p {
		display: inline-block;
		font-size: 15px;
	}
	
	.order-item-total {
		width: 100%;
		display: inline-block;
		margin-top: 20px;
		font-size: 15px;
		text-align: right;
	}
	
	/**
	 * 买家留言样式
	 * */
	.order-list-message {
		width: 100%;
		display: inline-block;
		margin-bottom: 20px;
		border-bottom: 1px solid #cccccc;
	}
	
	.order-message {
		position: relative;
		width: 90%;
		margin: 10px auto;
	}
	
	/**
	 * 订单结算样式
	 * */
	.order-list-summary {
		position: relative;
		width: 100%;
		display: inline-block;
		padding-right: 5%;
	}
	
	.order-cost-summary {
		width: auto;
		float: right;
	}
	
	.order-summary-text {
		display: inline-block;
		margin-right: 30px;
		text-align: right;
	}
	
	.order-summary-cost {
		display: inline-block;
		text-align: right;
	}
	
	/**
	 * 订单收货信息与提交按钮样式
	 * */
	.order-submit-container {
		width: 100%;
		display: inline-block;
		margin-top: 10px;
	}
	
	.order-submit-button {
		width: auto;
		height: 60px;
		display: inline-block;
		float: right;
	}
	
	.order-submit-button button {
		width: 140px;
		height: 45px;
		background: #d40f0f;
		color: #ffffff;
		font-size: 16px;
		border: hidden;
		border-radius: 3px;
	}
	
	.order-receive-message {
		width: auto;
		height: 45px;
		margin-right: 30px;
		display: inline-block;
		background: #f4f4f4;
		border: 1px solid #cccccc;
		text-align: left;
		float: right;
	}
	
	.order-address {
		height: 20px;
	}
	.order-address p {
		font-size: 12px;
		display: inline-block;
	}
	.order-receiver {
		height: 20px;
	}
	.order-receiver p {
		font-size: 12px;
		display: inline-block;
	}
	
	.text-bold {
		font-weight: bold;
	}
	
	.text-bold-color {
		font-size: 18px;
		font-weight: bold;
		color: #d40f0f;
	}
</style>