<template>
	<div class="login-container">
		<div class="login-wrapper">
			<h4>登录</h4>
			<div>
				<inputBox :inputId="'account'" :inputType="'text'"
					:tipId="'account-tip'" :tipText="'手机号'"></inputBox>
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
				<button class="login-button">登录</button>
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
	.login-container {
		position: absolute;
		top: 30%;
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