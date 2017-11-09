<template>
	<!--"我的"页面-->
	<div class="mine-page">
		<!--"我的"页面头部-用户信息-->
		<div class="user-message">
			<div class="user-img">
				<img :src="user.userImg" />
			</div>
			<div class="user-name">
				<p>{{user.username}}</p>
			</div>
		</div>
		<div class="my-order-operator">
			<div class="my-order-state-container">
				<ul>
					<li>
						<router-link to="/WXVueApp/orderlist/0">
							<i class="icon-indent-right icon-large"></i>
							<p>待发货</p>
						</router-link>
					</li>
					<li>
						<router-link to="/WXVueApp/orderlist/1">
							<i class="icon-tasks icon-large"></i>
							<p>待收货</p>
						</router-link>
					</li>
					<li>
						<router-link to="/WXVueApp/orderlist/2">
							<i class="icon-inbox icon-large"></i>
							<p>已完成</p>
						</router-link>
					</li>
					<li>
						<router-link to="/WXVueApp/orderlist/3">
							<i class="icon-truck icon-large"></i>
							<p>已取消</p>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="my-order-list">
				<router-link to="/WXVueApp/orderlist/1">
					<div class="container">
						<i class="icon-angle-right icon-2x angle-to-left"></i>
						<i class="icon-align-justify icon-large"></i>
						<p>我的订单</p>
					</div>
				</router-link>
			</div>
		</div>
		<div class="my-collection-container">
			<!--<div class="my-order-list border-top">
						<div class="container">
							<i class="icon-heart icon-large"></i>
							<p>我的收藏</p>
							<i class="icon-angle-right icon-2x angle-to-left"></i>
						</div>
					</div>-->
			<div class="my-order-list border-top">
				<div class="container">
					<router-link to="/WXVueApp/buyorder">
						<i class="icon-angle-right icon-2x angle-to-left"></i>
						<i class="icon-star icon-large"></i>
						<p>我买过的</p>
					</router-link>
				</div>
			</div>
			<div class="my-order-list">
				<div class="container">
					<router-link to="/WXVueApp/browse">
						<i class="icon-angle-right icon-2x angle-to-left"></i>
						<i class="icon-eye-open icon-large"></i>
						<p>我的浏览记录</p>
					</router-link>
				</div>
			</div>
		</div>
		<!--<div class="my-collection-container">
					<div class="my-order-list border-top">
						<div class="container">
							<i class="icon-credit-card icon-large"></i>
							<p>我的优惠卷</p>
							<i class="icon-angle-right icon-2x angle-to-left"></i>
						</div>
					</div>
					<div class="my-order-list">
						<div class="container">
							<i class="icon-credit-card icon-large"></i>
							<p>我的会员卡</p>
							<i class="icon-angle-right icon-2x angle-to-left"></i>
						</div>
					</div>
				</div>-->
		<div class="my-setting-container">
			<div class="my-order-list border-top">
				<div class="container">
					<router-link to="/WXVueApp/addr">
						<i class="icon-angle-right icon-2x angle-to-left"></i>
						<i class="icon-home icon-large"></i>
						<p>修改收货地址</p>
					</router-link>
				</div>
			</div>
			<div class="my-order-list">
				<div class="container">
					<router-link to="/WXVueApp/about">
						<i class="icon-angle-right icon-2x angle-to-left"></i>
						<i class="icon-phone-sign icon-large"></i>
						<p>联系我们</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				user: {"userImg": "", "username": ""}
			}
		},
		created () {
			this.initUser();
		},
		methods: {
			initUser(){
				var data = {"userToken": $.cookie("user_token")};
				var self = this;
				requestOnce(requestUrl + "/wxauth/userinfo", "POST", data, true, 
					function(data){
						if(data.headImg != undefined && data.name != undefined){
							self.user.userImg = data.headImg;
							self.user.username = data.name;
						}
					},
					function(){
						
					}
				);
			}
		}
	}
</script>

<style>
	/*
	 * 用户信息样式，包括用户头像和用户昵称
	 **/
	body {
		background-color: #FAFAFA;
	}
	
	.mine-page {
		position: fixed;
		top: 0;
		width: 100%;
	}
	
	.user-message {
		width: 100%;
		height: 90px;
		padding: 1%;
		background-color: #FC5050;
	}
	
	.user-img {
		width: auto;
		display: inline-block;
		margin-left: 5%;
		margin-top: 10px;
		float: left;
	}
	
	.user-img img {
		width: 65px;
		height: 65px;
		border-radius: 35px;
	}
	
	.user-name {
		display: inline-block;
		margin-left: 10px;
		float: left;
	}
	
	.user-name p {
		width: auto;
		margin-top: 20px;
		font-size: 18px;
		font-weight: 400;
		color: #FFFFFF;
	}
	/*
	 * 订单操作与查询样式
	 * */
	.my-order-state-container {
		width: 100%;
		height: auto;
		display: inline-block;
		border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
	}
	
	.my-order-state-container ul {
		width: inherit;
		list-style: none;
		padding: 0;
		margin: 2% 0 0 0;
	}
	
	.my-order-state-container ul li {
		width: 24%;
		display: inline-block;
		text-align: center;
	}
	
	.my-order-state-container a {
		color: #000000;
		text-decoration: none;
	}
	
	.my-order-state-container p {
		color: #515151;
	}
	
	.my-order-list {
		width: 100%;
		height: auto;
		display: table;
		background-color: #FFFFFF;
		border-bottom: 1px solid #CCCCCC;
		text-align: left;
	}
	
	.my-order-list a {
		color: #000000;
		text-decoration: none;
	}
	
	.my-order-list p {
		width: auto;
		line-height: 55px;
		display: table-cell;
		font-size: 16px;
		font-weight: 300;
		padding-left: 35px;
		vertical-align: middle;
		color: #515151;
	}
	
	.my-order-list i {
		width: auto;
		line-height: 55px;
		display: table-cell;
		vertical-align: middle;
	}
	
	.angle-to-left {
		float: right;
	}
	
	.my-collection-container {
		margin-top: 5%;
	}
	
	.border-top {
		border-top: 1px solid #CCCCCC;
	}
	
	.my-setting-container {
		width: 100%;
		height: auto;
		margin-top: 5%;
		margin-bottom: 60px;
	}
</style>