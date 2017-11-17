<template>
	<div>
		<transition>
			<div class="dialog-modal-mask" v-show="show">
				<div class="dialog-modal-wrapper">
					<div class="dialog-modal-container">
						<div class="dialog-title">
							<h4>{{title}}</h4>
							<img src="../../../static/images/icon-remove.png" @click="dismiss()" />
						</div>
						<div class="dialog-content">
							<p>{{content}}</p>
						</div>
						<div class="dialog-footer">
							<button @click="clickConfirm()">确定</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: "提示"
			},
			content: {
				type: String,
				default: ""
			}
		},
		methods: {
			dismiss(){
				this.$emit("close");
			},
			clickConfirm(){
				this.$emit("confirm");
			}
		}
	}
</script>

<style>
	.dialog-modal-mask {
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
	
	.dialog-modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}
	
	.dialog-modal-container {
		position: relative;
		width: 40%;
		height: auto;
		min-height: 25%;
		margin: 0 auto;
		padding: 20px 40px 20px 40px;
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		z-index: 99;
	}
	
	.dialog-title {
		width: 100%;
		text-align: left;
	}
	
	.dialog-title h4 {
		display: inline-block;
		font-weight: bold;
		font-size: 20px;
		font: "微软雅黑" roman;
	}
	
	.dialog-title img {
		width: 25px;
		float: right;
	}
	
	.dialog-content {
		width: 100%;
		margin-top: 20px;
		text-align: left;
	}
	
	.dialog-content p {
		font-size: 16px;
	}
	
	.dialog-footer {
		position: absolute;
		left: 40px;
		bottom: 20px;
	}
	
	.dialog-footer button {
		width: 90px;
		height: 30px;
		background: #d40f0f;
		color: #ffffff;
		border: hidden;
		border-radius: 3px;
	}
</style>