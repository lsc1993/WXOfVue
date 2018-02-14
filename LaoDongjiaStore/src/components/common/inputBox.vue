<template>
	<div>
		<div class="input-container">
			<input :id="inputId" :type="inputType"/>
			<p :id="tipId" class="tip-text">{{tipText}}</p>
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
			tipId: {
				type: String,
				default: ""
			},
			tipText: {
				type: String,
				default: ""
			},
			inputWidth: {
				type: String,
				default: "350px"
			}
		},
		created() {
			
		},
		mounted() {
			$("#" + this.inputId).css("width", this.inputWidth);
			this.animation();	
		},
		methods: {
			animation(){
				var id1 = "#" + this.inputId;
				var id2 = "#" + this.tipId;
				$(id1).focus(function(){
					$(id2).animate({
						top: "-10px",
						fontSize: "13px"
					},150,"swing");
					$(id2).css({"color": "#96b7ef", "z-index": "10"});
				}).blur(function(){
					if($(id1).val().length <= 0){
						$(id2).animate({
							top: "10px",
							fontSize: "16px"
						},150,"linear", function(){
							$(id2).css({"color": "#aaaaaa", "z-index": "-1"});
						});
					}else {
						$(id2).css({"color": "#aaaaaa", "z-index": "10"});
					}
				});
			}
		}
	}
</script>

<style>
	.input-container {
		position: relative;
		width: 350px;
	}
	
	.input-container input {
		height: 45px;
		margin: 20px auto;
		padding-left: 12px;
		display: block;
		border: 1px solid #dfdfdf;
		border-radius: 3px;
		background: rgba(255,255,255,0);
	}
	
	.tip-text {
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