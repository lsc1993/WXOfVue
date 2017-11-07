<template>
	<div>
		<div class="message-container">
			<img src="../../../static/images/icon-success1.png" />
			<p>交易成功</p>
		</div>
		<div class="receive-container">
			<textarea maxlength="20" placeholder="提点儿意见吧" id="comment-text"></textarea>
			<button class="btn" @click="submitComment()">提交</button>
		</div>
		<toast :show="showTip" :message="tip"></toast>
	</div>
</template>

<script>
	import toast from '../../components/common/toast'
	export default {
		data () {
			return {
				showTip: false,
				tip: ""
			}
		},
		components: {
			toast
		},
		methods: {
			submitComment(){
				var text = $("#comment-text").val();
				if(text == "" || text.length < 1){
					this.showToast("请输入您的意见");
					return;
				}
				var userToken = $.cookie("user_token");
				var data = {"userToken": userToken, "comment": text};
				var self = this;
				requestOnce(requestUrl + "/order/comment", "POST", data, true,
					function(data){
						alert("已收到您的宝贵意见");
						self.$router.push("/WXVueApp/mine");
					},
					function(){
						showToast("服务器出错了");
					}
				);
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showTip = true;
				setTimeout(function(){
					self.showTip = false;
				},2000);
			}
		}
	}
</script>

<style>
	.message-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 110px;
		display: table;
		background-color: rgba(252,127,0,1);
	}
	
	.message-container img {
		width: 90px;
		display: table-cell;
		margin-left: 10%;
		vertical-align: middle;
	}
	
	.message-container p {
		display: table-cell;
		vertical-align: middle;
		font-size: 22px;
		font-weight: bold;
		color: #ffffff;
	}
	
	.receive-container {
		padding: 5px;
		margin-top: 150px;
	}
	
	.receive-container p {
		font: "微软雅黑";
		font-size: 18px;
		font-weight: 400;
	}
	
	.receive-container textarea {
		width: 100%;
		height: 90px;
		margin-top: 5px;
		border: 1px solid #fc7f00;
		border-radius: 2px;
		overflow-y: auto;
	}
	
	.receive-container button {
		width: 80px;
		font-size: 15px;
		color: #FFFFFF;
		margin-top: 5px;
		float: right;
		border: 1px solid #fc7f00;
		background-color: rgba(252,127,0,.8);
	}
</style>