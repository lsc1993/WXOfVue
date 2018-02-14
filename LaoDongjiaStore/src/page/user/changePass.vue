<template>
	<div>
		<div class="changePass-container">
			<div class="changePass-wrapper">
				<h4>请输入手机号找回密码</h4>
				<div>
					<inputBox :inputId="'acount'" :inputType="'text'"
						:tipId="'account-tip'" :tipText="'手机号'"></inputBox>
					<div class="reset-check-container">
						<div class="reset-check-text-container">
							<inputAutoFit :inputId="'regeister-check-text'" :inputType="'text'"
								:tipId="'check-tip'" :tipText="'手机验证码'" />
						</div>
						<button>获取验证码</button>
					</div>
					<inputBox :inputId="'password'" :inputType="'password'"
						:tipId="'password-tip'" :tipText="'设置密码'"></inputBox>
					<inputBox :inputId="'pass-confirm'" :inputType="'password'"
						:tipId="'pass-confirm-tip'" :tipText="'确认密码'"></inputBox>
					<button class="changePass-button" @click="resetPassword()">重置密码</button>
				</div>
			</div>
		</div>
		<toast :show="showToastTip" :message="tip"></toast>
	</div>
</template>

<script>
	import inputBox from "../../components/common/inputBox"
	import inputAutoFit from "../../components/common/inputAutoFit"
	import toast from "../../components/common/toast"
	export default {
		data () {
			return {
				showToastTip: false,
				tip: ""
			}
		},
		components: {
			inputBox, inputAutoFit, toast
		},
		methods: {
			resetPassword() {
				var password = $("#password").val();
				if (!this.checkPassword(password)) {
					return;
				}
				var passConfirm = $("#pass-confirm").val();
				if (password != passConfirm) {
					this.showToast(PASSWORD_NOT_SAME);
					return;
				}
			},
			checkPassword(password) {
				if (!PASSWORD_REG.test(password)) {
					this.showToast(PASSWORD_MATCH_RULE);
					return false;
				}
				
				if (password == "" || password.length < 1) {
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
	.changePass-container {
		position: absolute;
		top: 30%;
		left: 20%;
		width: 60%;
		height: auto;
	}
	
	.changePass-wrapper {
		width: 350px;
		height: auto;
		margin: 0 auto;
	}
	
	.changePass-wrapper h4 {
		font-size: 20px;
		text-align: left;
	}

	.changePass-button {
		width: 350px;
		height: 50px;
		background: #d40f0f;
		border: hidden;
		border-radius: 5px;
		color: #ffffff;
		font-size: 16px;
	}
	
	.check-text {
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
	
	.regeister-check-container {
		position: relative;
		width: 350px;
		height: 45px;
	}
	
	.reset-check-text-container {
		position: relative;
		width: 250px;
		height: 45px;
		display: inline-block;
	}
	
	.reset-check-container button {
		position: relative;
		width: 96px;
		height: 42px;
		display: inline-block;
		background: #d40f0f;
		border: hidden;
		color: #ffffff;
		font-size: 14px;
	}
</style>