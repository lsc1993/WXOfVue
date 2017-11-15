<template>
	<div class="footer-container hidden-xs">
		<div class="footer-wrapper">
			<div class="store-describe">
				<p>Copyright© 老东家的风物馆官网 2017
					<br/>版权所有浙ICP备17024567号-1
				</p>
			</div>
			
			<div class="store-social-container">
				<div class="store-tel">
					<p>微信号：dongjia993</p>
					<p>头条号：老东家的风物馆</p>
				</div>
				<div class="store-social-wrapper">
					<img src="../../../static/images/icon-ldj-wx.jpg" />
					<p>微信公众号</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {}
</script>

<style>
	.footer-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120px;
		background: #fcfbf7;
		margin-top: 20px;
	}
	
	.store-describe {
		width: auto;
		float: left;
		display: inline-block;
		margin-top: 50px;
		margin-left: 15%;
	}
	
	.store-tel {
		display: inline-block;
		margin-top: 50px;
		text-align: left;
		
	}
	
	.store-social-container {
		width: auto;
		height: 100px;
		display: inline-block;
		float: right;
		margin-right: 10%;
		margin-top: 10px;
		background: #fcfbf7;
	}
	
	.store-social-wrapper {
		display: inline-block;
	}
	
	.store-social-wrapper img {
		width: 80px;
		margin: 0 auto;
	}
</style>