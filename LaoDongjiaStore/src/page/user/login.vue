<template>
	<div>
		<div class="login-container">
			<div class="login-wrapper">
				<h4>登录</h4>
				<div>
					<inputBox :inputId="'account'" :inputType="'text'"
						:tipId="'account-tip'" :tipText="'用户名'"></inputBox>
					<inputBox :inputId="'password'" :inputType="'password'"
						:tipId="'password-tip'" :tipText="'登录密码'"></inputBox>
					<div class="operator-container">
						<router-link to="/user/register">
							<p class="text-left">注册</p>
						</router-link>
						<router-link to="/user/changePass">
							<p class="text-right">忘记密码</p>
						</router-link>
					</div>
					<button class="login-button" @click="login()">登录</button>
				</div>
			</div>
		</div>
		<toast :show="showToastTip" :message="tip"></toast>
	</div>
</template>

<script>
	import inputBox from "../../components/common/inputBox"
	import toast from "../../components/common/toast"
	export default {
		data () {
			return {
				showToastTip: false,
				tip: ""
			}
		},
		components: {
			inputBox, toast
		},
		methods: {
			login() {
				var account = $("#account").val();
				if (!this.checkAccount(account)) {
					return;
				}
				var password = $("#password").val();
				if (!this.checkPassword(password)) {
					return;
				}
			},
			checkAccount(account) {
				if (!ACCOUNT_REG.test(account)) {
					this.showToast(ACCOUNT_MATCH_RULE);
					return false;
				}
				
				if (account == "" || account.length < 1) {
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
	.login-container {
		position: absolute;
		top: 25%;
		left: 20%;
		width: 60%;
		height: auto;
	}
	
	.login-wrapper {
		width: 350px;
		height: auto;
		margin: 0 auto;
	}
	
	.login-wrapper h4 {
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
	
	.login-button {
		width: 350px;
		height: 50px;
		background: #d40f0f;
		border: hidden;
		border-radius: 5px;
		color: #ffffff;
		font-size: 16px;
	}
</style>