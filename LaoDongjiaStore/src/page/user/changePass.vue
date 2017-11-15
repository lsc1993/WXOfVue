<template>
	<div class="changePass-container">
		<div class="changePass-wrapper">
			<h4>请输入手机号找回密码</h4>
			<div>
				<inputBox :inputId="'acount'" :inputType="'text'"
					:tipId="'account-tip'" :tipText="'手机号'"></inputBox>
				<div class="check-container">
					<input id="check-text" type="text" />
					<p id="check-text-tip" class="check-text">手机验证码</p>
					<button>获取验证码</button>
				</div>
				<inputBox :inputId="'password'" :inputType="'password'"
					:tipId="'password-tip'" :tipText="'设置密码'"></inputBox>
				<inputBox :inputId="'pass-confirm'" :inputType="'password'"
					:tipId="'pass-confirm-tip'" :tipText="'确认密码'"></inputBox>
				<button class="changePass-button">重置密码</button>
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
		mounted() {
			this.animation();
		},
		components: {
			inputBox
		},
		methods: {
			animation(){
				$("#check-text").focus(function(){
					$("#check-text-tip").animate({
						top: "-10px",
						fontSize: "13px"
					},200,"swing");
					$("#check-text-tip").css({"color": "#96b7ef", "z-index": "10"});
				}).blur(function(){
					if($("#check-text").val().length <= 0){
						$("#check-text-tip").animate({
							top: "10px",
							fontSize: "16px"
						},200,"linear", function(){
							$("#check-text-tip").css({"color": "#aaaaaa", "z-index": "-1"});
						});
					}else {
						$("#check-text-tip").css({"color": "#aaaaaa", "z-index": "10"});
					}
				});
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
	
	.check-container {
		position: relative;
		width: 350px;
		height: 45px;
	}
	
	.check-container input {
		position: relative;
		width: 250px;
		height: 45px;
		padding-left: 12px;
		display: inline-block;
		border: 1px solid #dfdfdf;
		border-radius: 3px;
		background: rgba(255,255,255,0);
	}
	
	.check-container button {
		position: relative;
		width: 96px;
		height: 42px;
		display: inline-block;
		background: #d40f0f;
		border: hidden;
		color: #ffffff;
		font-size: 14px;
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
</style>