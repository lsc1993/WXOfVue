<template>
	<div>
		<backHeader :title="headerTitle"></backHeader>
		<div class="address-list-container" id="address-manager">
			<h3 v-if="showTip">您还没有填写过地址~</h3>
			<div class="address-list-content">
				<ul v-if="!showTip">
					<li v-for="(address, index) in addrItems" :key="address.id">
						<div class="address-icon">
							<i class="icon-plane icon-large"></i>
						</div>
						<div class="address-message">
							<div>
								<p>{{address.name}}</p>
								<p>{{address.tel}}</p>
							</div>
							<div>
								<p>收货地址：{{address.address}}</p>
							</div>
						</div>
						<div class="address-edit-operator" @click="editAddr(index)">
							<i class="icon-edit icon-2x"></i>
						</div>
					</li>
				</ul>
				<div class="address-new-button">
					<button class="btn btn-primary" @click="createAddr()">新增收货地址 </button>
				</div>
			</div>
		</div>
		<addrEditor :show="showWindow"
			:showDelBtn="showDelBtn"
			:title="title"
			@close="removeWindow()"
			@deleteAddr="delAddr"
			@refresh="refreshAddr()">
		</addrEditor>
		<diaTip :showDialog="showDiaTip" :message="msg" :title="diaTitle">
			<div slot="dialog-footer">
				<p class="dialog-button-left" @click="dismiss()">取消</p>
				<p class="dialog-button-right" @click="confirm()">确定</p>
			</div>
		</diaTip>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import diaTip from '../../components/common/dialog'
	import backHeader from "../../components/header/backHeader"
	import addrEditor from "./addressEditor"
	export default {
		name: "addressManager",
		data () {
			return {
				title: "",
				headerTitle: "地址管理",
				showWindow: false,
				showDelBtn: false,
				showDialog: false,
				showDiaTip: false,
				diaTitle: "",
				msg: "",
				editIndex: 0,
				addrItems: []
			}
		},
		created(){
			this.initAddress();
		},
		components: {
			backHeader,addrEditor,diaTip
		},
		computed: {
			showTip(){
				if(this.addrItems.length == 0){
					return true;
				}
				return false;
			}
		},
		methods: {
			...mapMutations([
				'SET_ADDREDIT','RESET_ADDREDIT'
			]),
			initAddress(){
				var self = this;
				var data = {"userToken": $.cookie("user_token")};
				requestOnce(requestUrl + "/user/address", "POST", data, true,
					function(data){
						var len = data.address.length;
						if(len == 0 || len == undefined){
							return;
						}
						self.addrItems.splice(0, self.addrItems.length);
						for(var i=0;i < len;++i){//初始化地址列表
							var item = data.address[i];
							var addr = {
								"id": item.id,
								"name": item.receiver,
								"tel": item.phone,
								"province": item.province,
								"city": item.city,
								"region": item.region,
								"road": item.detailAddress,
								"address": item.province+item.city+item.region+item.detailAddress,
								"postcode": item.postcode
							};
							self.addrItems.push(addr);
						}
					},
					function(){
						showToast("电波迷路了~");
					}
				);
			},
			delAddr(){
				this.showDiaTip = true;
				this.msg = "是否删除地址？";
				this.diaTitle = "提示";
			},
			editAddr(index){
				this.editIndex = index;
				this.title="编辑地址";
				this.showDelBtn = true;
				this.showWindow = true;
				this.SET_ADDREDIT(this.addrItems[index]);
			},
			createAddr(){
				this.title="新建地址";
				this.showDelBtn = false;
				this.showWindow = true;
				this.RESET_ADDREDIT();
			},
			refreshAddr(){
				this.removeWindow();
				this.initAddress();
			},
			removeWindow(){
				this.showWindow = false;
			},
			confirm(){
				this.addrItems.splice(this.editIndex, 1);
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
	 * 收货地址样式
	 * */
	.address-list-container {
		width: 100%;
		height: auto;
		margin-bottom: 60px;
	}
	
	.address-list-container h3 {
		font-size: 16px;
		color: #CCCCCC;
		text-align: center;
	}
	
	.address-list-container ul {
		width: 100%;
		height: auto;
		list-style: none;
		padding: 0;
	}
	
	.address-list-container ul li {
		width: 100%;
		height: auto;
		display: block;
		text-align: left;
	}
	
	.address-list-content {
		width: 100%;
		height: auto;
		display: table;
	}
	
	.address-icon {
		width: 10%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	
	.address-message {
		width: 75%;
		min-width: 75%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
	}
	
	.address-message p {
		display: inline-block;
		font-size: 14px;
	}
	
	.address-edit-operator {
		width: 10%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	
	.address-new-button {
		position: fixed;
		width: 100%;
		height: auto;
		bottom: 0;
	}
	
	.address-new-button button {
		width: 90%;
		height: 45px;
		margin: 5%;
		font-size: 18px;
	}
</style>