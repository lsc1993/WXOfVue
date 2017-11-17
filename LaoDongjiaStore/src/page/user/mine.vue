<template>
	<div>
		<div class="user-message-container">
			<div class="container">
				<slideMenu></slideMenu>
				<div class="user-message">
					<div class="user-message-title">
						<h4>个人资料</h4>
					</div>
					<div class="user-message-header">
						<img src="../../../static/images/icon-ldj-wx.jpg" />
						<p>修改头像</p>
					</div>
					<div class="user-message-content">
						<div class="user-message-item">
							<p>昵称：</p><p>{{userInfo.nickName}}</p>
						</div>	
						<div class="user-message-item">
							<p>生日：</p><p>{{userInfo.brithday}}</p>
						</div>
						<div class="user-message-item">
							<p>性别：</p><p>{{userInfo.sex}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import slideMenu from "./children/slideMenu"
	export default {
		data () {
			return {
				userInfo: {
					"id": 1,
					"nickName": "tt",
					"brithday": "1993-01-23",
					"sex": "保密"
				}
			}
		},
		components: {
			slideMenu
		}
	}
</script>

<style>
	.user-message-container {
		position: relative;
		width: 100%;
		display: inline-block;
	}
	
	.user-message {
		width: 75%;
		min-height: 300px;
		display: inline-block;
		margin-left: 5%;
		padding: 5px;
		border: 1px solid #cccccc;
		float: left;
	}
	
	.user-message-title {
		text-align: left;
	}
	
	.user-message-title h4 {
		font-size: 20px;
		font-weight: 600;
	}
	
	.user-message-header {
		display: inline-block;
		float: left;
	}

	.user-message-header p:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	.user-message-header img {
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}
	
	.user-message-content {
		height: 200px;
		display: inline-block;
		margin-left: 40px;
		margin-top: 10px;
		text-align: left;
		float: left;
	}
	
	.user-message-item p {
		display: inline-block;
	}
</style>