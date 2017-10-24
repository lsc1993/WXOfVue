<template>
	<div>
		<transition name="popup-window-transition">
			<div class="popup-window-modal-mask" v-if="show">
				<div class="popup-window-modal-wrapper">
					<div class="popup-window-modal-container">
						<div class="container address-message-content">
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="address-new-title">
										<p>{{title}}</p>
										<button @click="$emit('close')"><i class="icon-remove"></i></button>
									</div>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-message-list">
									<p>收货人</p>
									<input type="text" :value="loadAddress.name" v-model="address.name" placeholder="名字"/>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-message-list">
									<p>选择地区</p>
									<ul>
										<li @click="chooseProvince()">{{loadAddress.province}}</li>
										<li @click="chooseCity()">{{loadAddress.city}}</li>
										<li @click="chooseRegion()">{{loadAddress.region}}</li>
									</ul>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-message-list">
									<p>联系电话</p>
									<input type="text" :value="loadAddress.tel" v-model="address.tel" placeholder="手机号或固定电话"/>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-message-list">
									<p>详细地址</p>
									<input type="text" :value="loadAddress.road" v-model="address.road" placeholder="如街道、楼层、门牌号等"/>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-message-list">
									<p>邮政编码</p>
									<input type="text" :value="loadAddress.postcode" v-model="address.postcode" placeholder="邮政编码(选填)"/>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12 address-operator-button">
									<button class="btn btn-success" @click="saveAddr()">保存</button>
									<button class="btn btn-danger" v-show="showDelBtn" @click="delAddr()">删除</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<addrChoose :showDialog="showDialog" :index="chooseIndex" @dismiss="removeWindow"></addrChoose>
	</div>
</template>

<script>
	import addrChoose from './addressChoose'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data () {
			return {
				showDialog: false,
				chooseIndex: 0,
				address: {
					province: "选择省份",
					city: "选择城市",
					region: "选择地区",
				},
			}
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			},
			showDelBtn: {
				type: Boolean,
				default: false
			}
		},
		components: {
			addrChoose
		},
		computed: {
			/*
			 * 对象展开运算符，映射state数据
			 * @param 字符串数组
			 */
			...mapState([
				'addrEdit'
			]),
			loadAddress(){
				//数组类型的数据传递的值是引用类型，采用赋值的方式防止修改了原有的地址
				this.address.id = this.addrEdit.id;
				this.address.name = this.addrEdit.name;
				this.address.tel = this.addrEdit.tel;
				this.address.province = this.addrEdit.province;
				this.address.city = this.addrEdit.city;
				this.address.region = this.addrEdit.region;
				this.address.road = this.addrEdit.road;
				this.address.address = this.addrEdit.address;
				this.address.postcode = this.addrEdit.postcode;
				return this.address;
			}
		},
		methods: {
			...mapMutations([
				"SET_PROVINCE","SET_CITY","SET_REGION"
			]),
			chooseProvince(){
				this.showDialog = true;
				this.chooseIndex = 0;
			},
			chooseCity(){
				this.showDialog = true;
				this.chooseIndex = 1;
			},
			chooseRegion(){
				this.showDialog = true;
				this.chooseIndex = 2;
			},
			saveAddr(){
				alert(this.address.name + this.address.tel + this.address.province + this.address.city + this.address.region);
			},
			delAddr(){
				this.$emit("deleteAddr");
			},
			removeWindow(){
				this.showDialog = false;
			}
		}
	}
</script>

<style>
	/**
	 * popupwindow包裹样式 
	 */
	.popup-window-modal-mask {
		position: fixed;
		z-index: 20;
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

	/**
	 * 新建与编辑收货地址popupwindow
	 * */
	.address-new-title {
		width: 100%;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.address-new-title p {
		width: auto;
		line-height: 50px;
		display: inline-block;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
	}
	
	.address-new-title button {
		width: auto;
		display: inline-block;
		margin-top: 10px;
		float: right;
		background-color: rgba(255,255,255,.5);
		border: 1px solid #CCCCCC;
		border-radius: 50%;
	}
	.address-message-content input {
		width: 70%;
		line-height: 45px;
		border: none;
		outline: none;
	}
	
	.address-message-content ul {
		width: 70%;
		height: 50px;
		padding: 0;
		list-style: none;
		display: inline-block;
	}
	
	.address-message-content ul li {
		width: 30%;
		height: 50px;
		line-height: 50px;
		display: inline-block;
		float: left;
	}
	
	.address-message-list p {
		width: 25%;
		line-height: 50px;
		font-size: 16px;
		display: inline-block;
		float: left;
	}
	
	.address-message-list {
		height: 50px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.address-operator-button {
		width: 100%;
		display: block;
	}
	
	.address-operator-button button {
		width: 90%;
		height: 40px;
		color: #FFFFFF;
		display: block;
		font-size: 16px;
		margin: 2% auto;
	}
	
	/**
	 * popupwindow显示动画
	 * */
	.popup-window-transition-enter-active, .popup-window-transition-leave-active {
		opacity: 0;
		transform: translateY(40%);
		-webkit-transform: translateY(40%);
	}
</style>