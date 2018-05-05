<template>
	<div>
		<div class="register-container">
			<div class="register-wrapper">
				<h4>注册</h4>
				<div>
					<inputBox :inputId="'account'" :inputType="'text'"
						:tipId="'account-tip'" :tipText="'6-16位字母、数字、`_` 组合'"></inputBox>
					<inputBox :inputId="'phone'" :inputType="'text'"
						:tipId="'phone-tip'" :tipText="'完成验证后，你可以用该手机登录和找回密码'"></inputBox>
					<div class="regeister-check-container">
						<div class="check-text-container">
							<inputAutoFit :inputId="'regeister-check-text'" :inputType="'text'"
								:tipId="'check-tip'" :tipText="'手机验证码'" />
						</div>
						<!--<p id="check-text-tip" class="regeister-check-text">手机验证码</p>-->
						<button>获取验证码</button>
					</div>
					<inputBox :inputId="'password'" :inputType="'password'"
						:tipId="'password-tip'" :tipText="'6-20位字母、数字、`_` 组合'"></inputBox>
					<inputBox :inputId="'pass-confirm'" :inputType="'password'"
						:tipId="'pass-confirm-tip'" :tipText="'确认密码'"></inputBox>
					<div class="operator-container">
						<router-link to="/user/login">
							<p class="text-left">已有账号?直接登录</p>
						</router-link>
					</div>
					<button id="regeister-btn" class="register-button register-button-enable" @click="regeister()">注册</button>
				</div>
			</div>
		</div>
		<toast :show="showToastTip" :message="tip"></toast>
		<loading :show="showLoading"></loading>
	</div>
</template>

<script>
	import inputBox from "../../components/common/inputBox"
	import inputAutoFit from "../../components/common/inputAutoFit"
	import toast from "../../components/common/toast"
	import loading from "../../components/common/loading"
	export default {
		data () {
			return {
				showToastTip: false,
				showLoading: false,
				tip: ""
			}
		},
		components: {
			inputBox, inputAutoFit, toast, loading
		},
		methods: {
			regeister() {
				var account = $("#account").val();
				if (!this.checkAccount(account)) {
					return;
				}
				var password = $("#password").val();
				if (!this.checkPassword(password)) {
					return;
				}
				var passConfirm = $("#pass-confirm").val();
				if (password != passConfirm) {
					this.showToast(PASSWORD_NOT_SAME);
					return;
				}
				$("#regeister-btn").prop("disabled", true);
				$("#regeister-btn").removeClass("register-button-enable");
				$("#regeister-btn").addClass("register-button-disable");
				var phone = $("#phone").val();
				var data = {
					"userName": account,
					"phone": phone,
					"password": password
				};
				data = JSON.stringify(data);
				this.showLoading = true;
				var self = this;
				requestOnce("/user1/register", REQUEST_TYPE_POST, data, 
					function(data){
						self.showLoading = false;
						self.showToast(data.message);
						$("#regeister-btn").prop("disabled", false);
						$("#regeister-btn").removeClass("register-button-disable");
						$("#regeister-btn").addClass("register-button-enable");
						if (data.code == 200) {
							self.$router.push("/login");
						}
					},
					function() {
						alert(FAIL);
						self.showLoading = false;
						$("#regeister-btn").prop("disabled", false);
						$("#regeister-btn").removeClass("register-button-disable");
						$("#regeister-btn").addClass("register-button-enable");
						self.$router.push("login");
					}
				);
			},
			checkAccount(account) {
				if (!ACCOUNT_REG.test(account)) {
					this.showToast(ACCOUNT_MATCH_RULE);
					return false;
				}
				
				if (account === "" || account.length < 1) {
					this.showToast(ENTER_ACCOUNT);
					return false;
				}
				
				if (account.length < ACCOUNT_SHORT_LENGTH) {
					this.showToast(ACCOUNT_TOO_SHORT);
					return false;
				}
				
				if (account.length > ACCOUNT_LONG_LENGTH) {
					this.showToast(ACCOUNT_TOO_LONG);
					return false;
				}
				
				return true;
			},
			checkPassword(password) {
				if (!PASSWORD_REG.test(password)) {
					this.showToast(PASSWORD_MATCH_RULE);
					return false;
				}
				
				if (password === "" || password.length < 1) {
					this.showToast(ENTER_PASSWORD);
					return false;
				}
				
				if (password.length < PASSWORD_SHORT_LENGTH) {
					this.showToast(PASSWORD_TOO_SHORT);
					return false;
				}
				
				if (password.length > PASSWORD_LONG_LENGTH) {
					this.showToast(PASSWORD_TOO_LONG);
					return false;
				}
				
				return true;
			},
			showToast(message) {
				var self = this;
				this.tip = message;
				this.showToastTip = true;
				setTimeout(function(){
					self.showToastTip = false;
				},2000);
			}
		}
	}
</script>

<style>
	.register-container {
		position: absolute;
		top: 25%;
		left: 20%;
		width: 60%;
		height: auto;
	}
	
	.register-wrapper {
		width: 350px;
		height: auto;
		margin: 0 auto;
	}
	
	.register-wrapper h4 {
		font-size: 20px;
		text-align: left;
	}
	
	.operator-container {
		width: 350px;
	}
	
	.operator-container p {
		display: inline-block;
		font-size: 14px;
		color: #aaaaaa;
	}
	
	.operator-container a {
		color: #000000;
	}
	
	.operator-container p:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	.text-left {
		float: left;
	}
	
	.text-right {
		float: right;
	}
	
	.register-button {
		width: 350px;
		height: 50px;
		border: hidden;
		border-radius: 5px;
		color: #ffffff;
		font-size: 16px;
	}
	
	.register-button-enable {
		background: #d40f0f;
	}
	
	.register-button-disable {
		background: #dedede;
	}
	
	.regeister-check-container {
		position: relative;
		width: 350px;
		height: 45px;
	}
	
	.check-text-container {
		position: relative;
		width: 250px;
		height: 45px;
		display: inline-block;
	}
	
	.regeister-check-container button {
		position: relative;
		width: 96px;
		height: 42px;
		display: inline-block;
		background: #d40f0f;
		border: hidden;
		color: #ffffff;
		font-size: 14px;
	}
	
	.regeister-check-text {
		position: absolute;
		top: 12px;
		left: 12px;
		font-size: 16px;
		transition: 0.3s ease;
		color: #aaaaaa;
		background: #ffffff;
		opacity: 1;
		z-index: -1;
	}
</style>