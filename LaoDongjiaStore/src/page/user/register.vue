<template>
	<div class="register-container">
		<div class="register-wrapper">
			<h4>注册</h4>
			<div>
				<inputBox :inputId="'acount'" :inputType="'text'"
					:tipId="'account-tip'" :tipText="'手机号'"></inputBox>
				<inputBox :inputId="'password'" :inputType="'password'"
					:tipId="'password-tip'" :tipText="'设置密码'"></inputBox>
				<inputBox :inputId="'pass-confirm'" :inputType="'password'"
					:tipId="'pass-confirm-tip'" :tipText="'确认密码'"></inputBox>
				<div class="operator-container">
					<router-link to="/user/login">
						<p class="text-left">已有账号?直接登录</p>
					</router-link>
				</div>
				<button class="register-button">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	import inputBox from "../../components/common/inputBox"
	export default {
		data () {
			return {
				msg: ""
			}
		},
		components: {
			inputBox
		},
		methods: {}
	}
</script>

<style>
	.register-container {
		position: absolute;
		top: 30%;
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
		background: #d40f0f;
		border: hidden;
		border-radius: 5px;
		color: #ffffff;
		font-size: 16px;
	}
</style>