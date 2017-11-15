<template>
	<div>
		<transition name="popup-window-transition">
			<div class="popup-window-modal-mask" v-if="show">
				<div class="popup-window-modal-wrapper">
					<div class="popup-window-modal-container">
						<div class="container">
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="address-choose-title">
										<p>选择收货地址</p>
										<button v-on:click="$emit('close')"><i class="icon-remove"></i></button>
									</div>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="address-list">
										<ul>
											<li v-for="(address,index) in addrList" :key="address.id">
												<div @click="chooseAddress(index)">
													<div class="address-item-radio">
														<input type="radio" />
													</div>
													<div class="address-item-message">
														<div class="product-receiver">
															<p>{{address.name}}</p>
															<p>{{address.tel}}</p>
														</div>
														<div class="receiver-address">
															<p>收货地址：{{address.address}}</p>
														</div>
													</div>
												</div>
												<div class="address-edit-button">
													<i class="icon-edit icon-large" @click="editAddress(index)"></i>
												</div>
											</li>
										</ul>
										<div class="add-address-button">
											<button class="btn btn-primary" @click="createAddress()">新建收货地址</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<addrEdit :show="showEdit" 
			:showDelBtn="showDel" 
			:title="addrTitle" 
			@close="removeWindow()"
			@deleteAddr="delAddr"
			@refresh="refreshAddr()">
		</addrEdit>
		<diaTip :showDialog="showDiaTip" :message="msg" :title="diaTitle">
			<div slot="dialog-footer">
				<p class="dialog-button-left" @click="dismiss()">取消</p>
				<p class="dialog-button-right" @click="confirm()">确定</p>
			</div>
		</diaTip>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import diaTip from '../../components/common/dialog'
	import addrEdit from './addressEditor'
	export default {
		data () {
			return {
				showEdit: false,
				showDel: false,
				addrTitle: "",
				editIndex: 0,
				showDiaTip: false,
				diaTitle: "",
				msg: "",
				addrList: []
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.initAddress();
		},
		components: {
			addrEdit,diaTip
		},
		methods: {
			...mapMutations([
				"SET_ADDRTEMP","SET_ADDREDIT","RESET_ADDREDIT"
			]),
			initAddress(){
				var self = this;
				var userToken = $.cookie("user_token");
				var data =  {"userToken": userToken};
				requestOnce(requestUrl + "/user/address", "POST", data, true,
					function(data){
						var len = data.address.length;
						if(len == 0){
							return;
						}
						self.addrList.splice(0,self.addrList.length);
						for(var i=0;i < len;++i){//初始化地址列表
							var address = data.address[i];
							var addr = {
								"id": address.id,
								"name": address.receiver,
								"tel": address.phone,
								"province": address.province,
								"city": address.city,
								"region": address.region,
								"road": address.detailAddress,
								"address": address.province+address.city+address.region+address.detailAddress,
								"postcode": address.postcode
							};
							self.addrList.push(addr);
						}
					},
					function(){
						
					}
				);
			},
			delAddr(){
				this.showDiaTip = true;
				this.msg = "是否删除地址？";
				this.diaTitle = "提示";
			},
			editAddress(index){
				this.editIndex = index;
				this.SET_ADDREDIT(this.addrList[index]);
				this.showEdit = true;
				this.showDel = true;
				this.addrTitle = "编辑收货地址";
			},
			createAddress(){
				this.RESET_ADDREDIT();
				this.showEdit = true;
				this.showDel = false;
				this.addrTitle = "新建收货地址";
			},
			chooseAddress(index){
				this.SET_ADDRTEMP(this.addrList[index]);
				this.$emit("close");
			},
			refreshAddr(){
				this.removeWindow();
				this.initAddress();
			},
			removeWindow(){
				this.showEdit = false;
			},
			confirm(){
				this.addrList.splice(this.editIndex, 1);
				this.removeWindow();
				this.dismiss();
			},
			dismiss(){
				this.showDiaTip = false;
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
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.5);
		display: table;
	    transition: opacity .2s ease;
		-webkit-transition: .2s ease;
		z-index: 10;
	}
	
	.popup-window-modal-wrapper {
		display: table-cell;
	}
	
	.popup-window-modal-container {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: auto;
		max-height: 60%;
		overflow-y: scroll;
		margin: 0px auto;
		background-color: #fff;
		transition: all .2s ease;
		font-family: Helvetica, Arial, sans-serif;
	}
	
	/*
	 * 地址选择popupwindow样式
	 * */
	.address-choose-title {
		width: 100%;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.address-choose-title p {
		width: auto;
		line-height: 50px;
		font-size: 18px;
		font-weight: 500;
	}
	
	.address-choose-title button {
		width: auto;
		display: inline-block;
		margin-top: 10px;
		float: right;
		background-color: rgba(255,255,255,.5);
		border: 1px solid #CCCCCC;
		border-radius: 50%;
	}
	
	.address-list {
		width: 100%;
		height: auto;
	}
	
	.address-list ul {
		width: 100%;
		height: auto;
		padding: 0;
		list-style: none;
	}
	
	.address-list ul li {
		width: 100%;
		height: auto;
		border-bottom: 1px solid #CCCCCC;
		padding-top: 2%;
		display: table;
	}
	
	.address-item-radio {
		width: 10%;
		height: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.address-item-radio input {
		width: auto;
		margin: 0 auto;
	}
	
	.address-item-message {
		width: 80%;
		display: table-cell;
	}
	
	.product-receiver {
		width: auto;
		height: auto;
		text-align: left;
	}
	
	.product-receiver p {
		width: auto;
		line-height: 18px;
		font-size: 15px;
		float: left;
	}
	
	.receiver-address {
		width: auto;
		height: auto;
		text-align: left;
	}
	
	.receiver-address p {
		width: auto;
		line-height: 15px;
		display: inline-block;
		font-size: 13px;
		color: #CCCCCC;
		white-space: pre-line;
		float: left;
	}
	
	.address-edit-button {
		width: 10%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}

	.add-address-button {
		width: 100%;
		height: 40px;
		margin: 1%;
	}
	
	.add-address-button button {
		width: inherit;
		height: 35px;
		font-size: 16px;
		color: #FFFFFF;
		border-radius: 2px;
	}
</style>