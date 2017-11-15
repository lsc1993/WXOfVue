<template>
	<div>
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
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<addrList :show="showAddrList" @close="removeAddrWin()"></addrList>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	import addrList from "../address/addressList"
	export default {
		data () {
			return {
				showAddrList: false,
				address: {}
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter, addrList
		},
		computed: {
			...mapState([
				"addrTemp"
			]),
			loadAddr(){
				this.address = this.addrTemp;
				return this.address;
			}
		},
		methods: {
			chooseAddr(){
				this.showAddrList = true;
			},
			removeAddrWin(){
				this.showAddrList = false;
			}
		}
	}
</script>

<style>
	.order-container {
		position: relative;
		width: 100%;
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
</style>