<template>
	<div>
		<div class="slide-container">
			<div class="slide-menu-conainer">
				<div class="slide-menu-title">
					<img src="../../../../static/images/icon-order-list.png" />
					<h4>订单管理</h4>
				</div>
				<div class="slide-menu-item">
					<router-link to="/user/orderMenu">
						<p class="text-color">我的订单</p>
					</router-link>
				</div>
			</div>
			<div class="slide-menu-conainer">
				<div class="slide-menu-title">
					<img src="../../../../static/images/icon-account.png" />
					<h4>账户管理</h4>
				</div>
				<div class="slide-menu-item">
					<router-link to="/user/changePass">
						<p class="text-color">修改密码</p>
					</router-link>
				</div>
			</div>
			<div class="slide-menu-conainer">
				<div class="slide-menu-title">
					<img src="../../../../static/images/icon-user-message.png" />
					<h4>个人信息</h4>
				</div>
				<div class="slide-menu-item">
					<router-link to="/user/mine">
						<p class="text-color">个人资料</p>
					</router-link>
					<router-link to="/user/address">
						<p class="text-color">收货地址</p>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.slide-container {
		position: relative;
		width: 170px;
		height: auto;
		display: inline-block;
		float: left;
		border: 1px solid #cccccc;
		border-radius: 3px;
	}
	
	.text-color {
		font: "微软雅黑";
		font-size: 14px;
		color: #aaaaaa;
		margin-left: 20px;
	}
	
	.slide-menu-conainer {
		text-align: left;
		margin-left: 20px;
		margin-top: 20px;
	}
	
	.slide-menu-title {
		display: block;
		margin-left: 0;
	}
	
	.slide-menu-title img {
		width: 20px;
		display: inline-block;
	}
	
	.slide-menu-title h4 {
		display: inline-block;
		font-size: 14px;
		font-weight: 600;
	}
	
	.slide-menu-item a {
		color: #000000;
		text-decoration: none;
	}
	
	.slide-menu-item a:hover {
		cursor: pointer;
	}
</style>