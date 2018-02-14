<!--描述：一个支持自定义宽度的输入控件-->
<template>
	<div>
		<div class="input-fit-container">
			<input :id="inputId" :type="inputType" :value="inputValue"/>
			<p :id="tipId" class="tip-fit-text">{{tipText}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			inputId: {
				type: String,
				default: ""
			},
			inputType: {
				type: String,
				default: ""
			},
			inputValue: {
				type: String,
				default: ""
			},
			tipId: {
				type: String,
				default: ""
			},
			tipText: {
				type: String,
				default: ""
			}
		},
		mounted() {
			this.initTip();
			this.animation();	
		},
		watch: {
			inputValue(){
				this.initTip();
			}
		},
		methods: {
			animation(){
				var id1 = "#" + this.inputId;
				var id2 = "#" + this.tipId;
				$(id1).focus(function(){
					$(id2).animate({
						top: "-10px",
						fontSize: "13px"
					},100,"swing");
					$(id2).css({"color": "#96b7ef", "z-index": "10"});
				}).blur(function(){
					if($(id1).val().length <= 0){
						$(id2).animate({
							top: "10px",
							fontSize: "14px"
						},100,"linear", function(){
							$(id2).css({"color": "#aaaaaa", "z-index": "-1"});
						});
					}else {
						$(id2).css({"color": "#aaaaaa", "z-index": "10"});
					}
				});
			},
			initTip(){
				var id1 = "#" + this.inputId;
				var id2 = "#" + this.tipId;
				if(this.inputValue != ""){
					$(id2).animate({
						top: "-10px",
						fontSize: "13px"
					},100,"swing");
					$(id2).css({"color": "#aaaaaa", "z-index": "10"});
				}else {
					$(id2).animate({
						top: "10px",
						fontSize: "14px"
					},100,"linear", function(){
						$(id2).css({"color": "#aaaaaa", "z-index": "-1"});
					});
				}
			}
		}
	}
</script>

<style>
	.input-fit-container {
		position: relative;
	}
	
	.input-fit-container input {
		width: 100%;
		height: 45px;
		padding-left: 12px;
		border: 1px solid #dfdfdf;
		border-radius: 3px;
		background: rgba(255,255,255,0);
	}
	
	.tip-fit-text {
		position: absolute;
		top: 12px;
		left: 12px;
		font-size: 14px;
		transition: 0.2s ease;
		color: #aaaaaa;
		background: #ffffff;
		opacity: 1;
		z-index: -1;
	}
</style>