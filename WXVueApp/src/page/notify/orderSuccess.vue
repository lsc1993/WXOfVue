<template>
	<div>
		<div class="container">
			<div class="tip-container">
				<img src="../../../static/images/icon-success.png" />
				<p>下单成功</p>
			</div>
			<p>您已成功下单，我们会及时处理</p>
			<div class="operator-container">
				<router-link to="/WXVueApp/">
					<button>返回首页</button>
				</router-link>
				<router-link to="/WXVueApp/orderlist/1">
					<button>查看订单</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.tip-container {
		width: 50%;
		height: auto;
		margin: 0 auto;
	}
	
	.tip-container img {
		width: 100px;
		margin: 0 auto;
		display: block;
	}
	
	.tip-container p {
		font-size: 20px;
		font-weight: 500;
		color: #1296db;
		margin-top: 10px;
	}
	
	.operator-container {
		width: 265px;
		margin: 0 auto;
		margin-top: 10%;
		padding-left: 20px;
	}
	
	.operator-container a {
		text-decoration: none;
	}
	
	.operator-container button {
		width: 100px;
		height: 35px;
		background: rgba(255,255,255,0.1);
		border: 1px solid #1296db;
		font-size: 14px;
		color: #1296db;
		margin-right: 20px;
	}	
</style>