<template>
	<div class="fixed-header">
		<div class="container">
			<div class="store-hreader-wrapper">
				<div class="store-name-container">
					<img src="../../assets/logo.png" />
					<p>老东家的风物馆</p>
				</div>
				<div class="menu-container hidden-xs">
					<router-link to="/user/login"><p class="divider-line">登录</p></router-link>
					<router-link to="/user/register"><p>注册</p></router-link>
					<router-link to="/shopcart">
						<img src="../../../static/images/icon-shopcart.png" />
					</router-link>
				</div>
				<div class="menu-list-container visible-xs">
					<router-link to="/shopcart">
						<img src="../../../static/images/icon-shopcart.png"/>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.fixed-header {
		position: fixed;
		top: 0;
		left: 0;
		rigtht: 0;
		width: 100%;
		height: auto;
		display: inline-block;
		clear: both;
		background: #ffffff;
		z-index: 20;
	}
	.store-hreader-wrapper {
		height: 50px;
		vertical-align: middle;
		margin-top: 25px;
	}
	
	.store-name-container {
		display: inline-block;
		float: left;
	}
	
	.store-name-container img {
		width: 50px;
		height: 50px;
	}
	
	.store-name-container p {
		display: inline-block;
		margin-left: 20px;
		font-size: 20px;
	}
	
	.menu-container {
		display: inline-block;
		float: right;
	}
	
	.divider-line:after {
		content: " ";
		border-left: 1px solid #000;
		margin-left: 6px;
	}
	
	.menu-container p {
		display: inline-block;
		line-height: 50px;
		margin-right: 8px;
		font-size: 15px;
	}
	
	.menu-container img {
		width: 20px;
		height: 20px;
	}
	
	.menu-container a {
		color: #000000;
		text-decoration: none;
	}
	
	.menu-container a:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	.menu-list-container {
		display: inline-block;
		float: right;
	}
	
	.menu-list-container p {
		display: inline-block;
	}
	
	.menu-list-container img {
		width: 25px;
		height: 25px;
	}
</style>