<template>
	<div class="fixed-footer" id="footer-bar">
			<div class="bottom-tab">
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button" id="sss">
								<router-link to="/home">
									<!--<i class="icon-apple"></i>-->
									<img src="../../../static/images/icon-home.png" />
									<p>首页</p>
								</router-link>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button">
								<router-link to="/shopcart">
									<!--<i class="icon-shopping-cart"></i>-->
									<img src="../../../static/images/icon-shopcart.png" />
									<p>购物车</p>
								</router-link>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button">
								<router-link to="/mine">
									<!--<i class="icon-envelope"></i>-->
									<img src="../../../static/images/icon-me.png" />
									<p>我的</p>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	export default {

    }
</script>

<style>
	.fixed-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		min-height: 50px;
		border-top: 1px solid #CCCCCC;
		background: #FFFFFF;
		z-index: 99;
	}
	
	.bottom-tab {
		margin: 0 auto;
	}
	
	.bottom-tab-button {
		width: auto;
		margin: 10px auto;
		text-align: center;
	}
	
	.bottom-tab-button img {
		width: 18px;
		height: 18px;
	}
	
	.bottom-tab-button p {
		font-size: 12px;
	}
	
	.bottom-tab a {
		text-decoration: none;
		color: #000000;
	}
</style>