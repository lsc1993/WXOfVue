<template>
	<div>
		<transition name="address">
			<div class="address-list-mask" v-show="show">
				<div class="address-list-container">
					<div class="address-list-wrapper">
						<div class="address-list-title">
							<h4>选择地址</h4>
							<img src="../../../static/images/icon-remove.png" @click="remove()" />
						</div>
						<div class="address-list">
							<div class="address-tip-container" v-show="showTip">
								<img src="../../../static/images/icon-address.png" />
								<p>您还没有创建过地址！</p>
							</div>
							<ul v-show="!showTip">
								<li v-for="(address, index) in addrList">
									<div class="address-message">
										<div class="address-position-img" @click="chooseAddress(index)">
											<img src="../../../static/images/icon-position.png" />
										</div>
										<div class="address-describe" @click="chooseAddress(index)">
											<div class="address-name">
												<p>{{address.name}}</p>
												<p>{{address.tel}}</p>
											</div>
											<div class="address-detail">
												<p>{{address.province}}</p>
												<p>{{address.city}}</p>
												<p>{{address.region}}</p>
												<p>{{address.address}}</p>
											</div>
										</div>
										<div class="address-operator">
											<p @click="editClick(index)">编辑</p>
											<p @click="removeClick(index)">删除</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<button @click="createAddr()">新增收货地址+</button>
					</div>
				</div>
			</div>
		</transition>
		<addrEditor :show="showEditor" :title="editTitle" 
			:winType="windowType" :choosePos="editPos"
			@close="removeEditWin()"></addrEditor>
	</div>
</template>

<script>
	import {mapMutations} from "vuex"
	import addrEditor from "./addressEditor"
	export default {
		data () {
			return {
				showEditor: false,
				windowType: "create",
				editPos: 0,
				editTitle: "新增收货地址",
				addrList: [
					{
						"id": 1,
						"name": "刘爽",
						"tel": "15700084332",
						"province": "浙江省",
						"city": "杭州市",
						"region": "西湖区",
						"address": "留和路135号UN公社9幢703",
						"postcode": "310000"
					},
					{
						"id": 1,
						"name": "刘爽",
						"tel": "15700084332",
						"province": "浙江省",
						"city": "杭州市",
						"region": "西湖区",
						"address": "留和路288号浙江工业大学",
						"postcode": "310000"
					},
					{
						"id": 1,
						"name": "刘爽",
						"tel": "15700084332",
						"province": "浙江省",
						"city": "杭州市",
						"region": "西湖区",
						"address": "留和路留下街道",
						"postcode": "310000"
					}
				]
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			showTip(){
				if(this.addrList.length <= 0){
					return true;
				}
				return false;
			}
		},
		components: {
			addrEditor
		},
		methods: {
			...mapMutations([
				"SET_ADDREDIT", "RESET_ADDREDIT", "SET_ADDRTEMP"
			]),
			chooseAddress(index){
				this.SET_ADDRTEMP(this.addrList[index]);
				this.remove();
			},
			createAddr(){
				this.RESET_ADDREDIT();
				this.windowType = "create"
				this.editTitle = "新增收货地址";
				this.showEditWin();
			},
			editClick(index){
				this.SET_ADDREDIT(this.addrList[index]);
				this.windowType = "edit";
				this.editPos = index;
				this.editTitle = "编辑收货地址";
				this.showEditWin();
			},
			removeClick(index){
				
			},
			remove(){
				this.$emit("close");
			},
			showEditWin(){
				this.remove();
				this.showEditor = true;
			},
			removeEditWin(){
				this.showEditor = false;
			}
		}
	}
</script>

<style>
	/**
	 * 地址外部样式
	 * */
	.address-list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	    transition: opacity .3s ease;
		-webkit-transition: .3s ease;
		z-index: 30;
	}
	
	/** 
	 * 地址父布局样式
	 * */
	.address-list-container {
		position: absolute;
		top: 30%;
		left: 25%;
		width: 50%;
		height: 40%;
		text-align: center;
		background-color: #ffffff;
		transition: all .3s ease;
		z-index: 40;
	}
	
	.address-list-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 15px;
	}
	
	.address-list-wrapper button {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 120px;
		height: 30px;
		display: inline-block;
		background: #d40f0f;
		color: #ffffff;
		border: hidden;
		border-radius: 3px;
	}
	
	/**
	 * 地址列表样式
	 * */
	.address-list {
		width: auto;
		max-height: 70%;
		overflow-y: scroll;
		text-align: center;
	}
	
	.address-list ul {
		padding: 0;
	}
	
	.address-list ul li {
		width: 90%;
		list-style: none;
		display: inline-block;
	}
	
	/**
	 * 地址信息样式
	 * */
	.address-message {
		position: relative;
		display: table;
		text-align: left;
	}
	
	.address-position-img {
		display: table-cell;
		vertical-align: middle;
		padding-right: 10px;
	}
	
	.address-position-img img {
		width: 25px;
	}
	
	.address-describe {
		display: table-cell;
		vertical-align: middle;
	}
	
	.address-name p {
		display: inline-block;
	}	
	
	.address-detail p {
		display: inline-block; 
	}
	
	.address-operator {
		padding-left: 10px;
		display: table-cell;
		vertical-align: bottom;
	}
	
	.address-operator p {
		display: inline-block;
	}
	
	.address-operator p:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	/**
	 * 地址列表title样式
	 * */
	.address-list-title {
		position: relative;
	}
	
	.address-list-title img {
		position: absolute;
		right: 10px;
		width: 25px;
		display: inline-block;
	}
	
	.address-list-title h4 {
		font-size: 20px;
		font-weight: 550;
		display: inline-block; 
	}
	
	/**
	 * 未创建地址提示样式
	 * */
	.address-tip-container {
		width: 50%;
		margin: 30px auto;
	}
	
	.address-tip-container img {
		width: 80px;
		margin: 0 auto;
	}
	
	/**
	 * 地址选择列表动画
	 * */
	.address-enter-active, .address-leave-active {
		transition: all 0.3s ease;
	}
	
	.address-enter, .address-leave-to {
		opacity: 0;
	}
</style>