<template>
	<div>
		<div class="user-address-container">
			<div class="container">
				<slideMenu></slideMenu>
				<div class="user-address">
					<div class="user-address-title">
						<h4>收货地址</h4>
					</div>
					<div class="address-list-wrapper">
						<div class="address-list">
							<div class="address-tip-container" v-show="showTip">
								<img src="../../../static/images/icon-address.png" />
								<p>您还没有创建过地址！</p>
							</div>
							<ul v-show="!showTip">
								<li v-for="(address, index) in addrList">
									<div class="address-message">
										<div class="address-position-img">
											<img src="../../../static/images/icon-position.png" />
										</div>
										<div class="address-describe">
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
		</div>
		<addrEditor :show="showEditor" :title="editTitle" 
			:winType="windowType" :choosePos="editPos"
			@close="removeEditWin()"></addrEditor>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import slideMenu from "./children/slideMenu"
	import addrEditor from "../address/addressEditor"
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
					},
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
						"province": "河南省",
						"city": "郑州市",
						"region": "二七区",
						"address": "二七路",
						"postcode": "310000"
					}
				]
			}
		},
		components: {
			slideMenu, addrEditor
		},
		computed: {
			showTip(){
				if(this.addrList.length <= 0){
					return true;
				}
				return false;
			}
		},
		methods: {
			...mapMutations([
				"SET_ADDREDIT", "RESET_ADDREDIT"
			]),
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
	.user-address-container {
		position: relative;
		width: 100%;	
	}
	
	.user-address {
		width: 75%;
		height: 400px;
		display: inline-block;
		margin-left: 5%;
		padding: 5px;
		border: 1px solid #cccccc;
		border-radius: 3px;
		float: left;
	}
	
	.user-address-title {
		text-align: left;
	}
	
	.user-address-title h4 {
		margin-left: 40px;
		font-size: 20px;
		font-weight: 600;
	}
	
	/**
	 * 地址列表样式
	 * */
	.address-list-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 15px;
	}
	
	.address-list-wrapper button {
		position: absolute;
		bottom: 50px;
		left: 50%;
		width: 120px;
		height: 30px;
		margin-left: -60px;
		display: inline-block;
		background: #d40f0f;
		color: #ffffff;
		border: hidden;
		border-radius: 3px;
	}
	
	.address-list {
		width: auto;
		max-height: 260px;
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
	 * 未创建地址提示样式
	 * */
	.address-tip-container {
		width: 50%;
		margin: 30px auto;
	}
	
	.address-tip-container p {
		font-size: 16px;
		font-weight: 500;
	}
	
	.address-tip-container img {
		width: 120px;
		margin: 0 auto;
	}
</style>