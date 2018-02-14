<template>
	<div>
		<transition>
			<div class="user-change-message-mask" v-show="show">
				<div class="user-change-message-wrapper">
					<div class="user-change-message-container">
						<div class="user-change-title">
							<h4>{{title}}</h4>
							<img src="../../../../static/images/icon-remove.png" @click="dismiss()" />
						</div>
						<div class="user-change-content">
							<div class="user-change-container">
								<div class="user-change-input">
									<inputFit :inputId="'nickname'" :inputType="'text'"
										:tipId="'nickname-tip'" :tipText="'昵称'" ></inputFit>
								</div>
							</div>
							<div class="user-change-container">
								<div class="user-change-input">
									<inputFit :inputId="'phone'" :inputType="'text'"
										:tipId="'phone-tip'" :tipText="'手机号'" ></inputFit>
								</div>
							</div>
							<div class="user-change-container">
								<div class="user-change-input">
									<input type="date"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import inputFit from "../../../components/common/inputAutoFit"
	export default {
		data () {
			return {
				title: "修改个人资料"
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		components: {
			inputFit
		},
		methods: {
			dismiss() {
				this.$emit("close");
			}
		}
	}
</script>

<style>
	.user-change-message-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: table;
		background: rgba(0, 0, 0, 0.53);
		transition: opacity 0.3s ease;
		-webkit-transition: 0.3s ease;
		z-index: 60;
	}
	
	.user-change-message-wrapper {
		display: table-cell;
		vertical-align: middle;
	}
	
	.user-change-message-container {
		position: relative;
		width: 40%;
		height: 70%;
		min-height: 25%;
		margin: 0 auto;
		padding: 20px 40px 20px 40px;
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		z-index: 99;
	}
	
	.user-change-title {
		width: 100%;
		text-align: left;
	}
	
	.user-change-title h4 {
		display: inline-block;
		font-weight: bold;
		font-size: 20px;
		font: "微软雅黑" roman;
	}
	
	.user-change-title img {
		width: 25px;
		float: right;
	}
	
	.user-change-content {
		width: 100%;
		height: auto;
		margin: 0 auto;
	}
	
	.user-change-container {
		width: 100%;
		height: auto;
		margin-top: 20px;
	}
	
	.user-change-input {
		width: 100%;
	}
	
	.user-change-container input[type=date] {
		width: 100%;
		height: 40px;
	}
</style>