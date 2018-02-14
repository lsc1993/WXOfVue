<template>
	<div>
		<transition>
			<div class="address-modal-mask" v-show="show">
				<div class="address-modal-container">
					<div class="address-modal-title">
						<h4>{{title}}</h4>
						<img src="../../../static/images/icon-remove.png" @click="remove()" />
					</div>
					<div class="address-detail-container">
						<div class="address-receiver-container">
							<inputAutoFit :inputId="'receiver'" :inputType="'text'" 
								:inputValue="loadAddr.name"
								:tipId="'receiver-tip'" :tipText="'收货人（必填）'"
								class="receiver-container"></inputAutoFit>
							<inputAutoFit :inputId="'tel'" :inputType="'text'" 
								:inputValue="loadAddr.tel"
								:tipId="'tel-tip'" :tipText="'手机号（必填）'"
								class="tel-container"></inputAutoFit>
						</div>
						<div class="address-region-container">
							<addrChoose :editable="editWin" :indexEdit="editPos"></addrChoose>
						</div>
						<div class="address-message-container">
							<inputAutoFit :inputId="'address'" :inputType="'text'" 
								:inputValue="loadAddr.address"
								:tipId="'address-tip'" :tipText="'详细地址（必填）'"
								class="deatil-container"></inputAutoFit>
							<inputAutoFit :inputId="'postcode'" :inputType="'text'" 
								:inputValue="loadAddr.postcode"
								:tipId="'postcode-tip'" :tipText="'邮政编码（选填）'"
								class="postcode-container"></inputAutoFit>
						</div>
						<div class="address-edit-oprator">
							<button class="confirm-button" @click="confirmClick()">确定</button>
							<button class="cancel-button" @click="cancelClick()">取消</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import addrChoose from "./addressChoose"
	import inputAutoFit from "../../components/common/inputAutoFit"
	export default {
		data () {
			return {
				editWin: false,
				editPos: -1,
				address: {}
			}
		},
		props: {
			title: {
				type: String,
				default: "收货地址"
			},
			winType: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			},
			choosePos: {
				type: Number,
				default: 0
			}
		},
		computed: {
			...mapState([
				"addrEdit"
			]),
			loadAddr(){
				this.address.id = this.addrEdit.id;
				this.address.name = this.addrEdit.name;
				this.address.tel = this.addrEdit.tel;
				this.address.province = this.addrEdit.province;
				this.address.city = this.addrEdit.city;
				this.address.region = this.addrEdit.region;
				this.address.address = this.addrEdit.address;
				this.address.postcode = this.addrEdit.postcode;
				return this.address;
			}
		},
		watch: {
			winType(){
				if(this.winType == "create"){  //监听编辑弹窗类型变化
					this.editWin = false;
					this.editPos = -1;
				}else if(this.winType == "edit"){
					this.editWin = true;
					this.editPos = this.choosePos;
				}
			},
			choosePos(){
				this.editPos = this.choosePos;  //监听地址选择变化
			}
		},
		components: {
			inputAutoFit, addrChoose
		},
		methods: {
			confirmClick(){
				alert(this.address.name + " " + $("#receiver").val() + this.addrEdit.name);
			},
			cancelClick(){
				this.remove();
			},
			remove(){
				this.$emit("close");
			}
		}
	}
</script>

<style>
	.address-modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	    transition: opacity .2s ease;
		-webkit-transition: .2s ease;
		z-index: 50;
	}
	
	.address-modal-container {
		position: absolute;
		top: 20%;
		left: 30%;
		width: 45%;
		height: auto;
		padding: 15px;
		background-color: #fff;
		border-radius: 5px;
		transition: all .3s ease;
		z-index: 60;
	}
	
	.address-modal-title {
		position: relative;
		text-align: left;
	}
	
	.address-modal-title h4 {
		font-weight: 500;
		font-size: 20px;
		display: inline-block;
		margin-left: 5%;
	}
	
	.address-modal-title img {
		position: absolute;
		right: 0;
		width: 25px;
		display: inline-block;
	}
	
	.address-detail-container {
		position: relative;
	}
	
	.address-receiver-container {
		width: 90%;
		display: inline-block;
	}
	
	.receiver-container {
		position: relative;
		width: 32%;
		height: 45px;
		float: left;
		margin-right: 5%;
	}
	
	.tel-container {
		position: relative;
		width: 63%;
		height: 45px;
		float: left;
	}
	
	.address-message-container {
		width: 90%;
		display: inline-block;
		margin-top: 10px;
	}
	
	.detail-container {
		position: relative;
		width: 100%;
		height: 45px;
	}
	
	.postcode-container {
		position: relative;
		width: 100%;
		height: 45px;
		margin-top: 10px;
	}
	
	.address-region-container {
		width: 90%;
		margin-top: 10px;
		display: inline-block;
	}
	
	.address-edit-oprator {
		width: 90%;
		display: inline-block;
		text-align: left;
		margin-top: 20px;
	}
	
	.confirm-button {
		width: 90px;
		height: 35px;
		background: #d40f0f;
		color: #ffffff;
		font-size: 14px;
		border: hidden;
		border-radius: 3px;
	}
	
	.cancel-button {
		width: 90px;
		height: 35px;
		background: #999999;
		color: #ffffff;
		font-size: 14px;
		border: hidden;
		border-radius: 3px;
	}
</style>