<template>
	<div class="fixed-footer" id="footer-bar">
			<div class="bottom-tab">
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button" id="sss">
								<a href="index.html">
									<i class="icon-apple"></i>
									<p>首页</p>
								</a>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button">
								<a href="shop-cart.html">
									<i class="icon-shopping-cart"></i>
									<p>购物车</p>
								</a>
							</div>
						</div>
						<div class="col-md-4 col-sm-4 col-xs-4">
							<div class="bottom-tab-button">
								<a href="mine.html">
									<i class="icon-envelope"></i>
									<p>我的</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	export default {
		name: 'fixed-footer',
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
        	
        },
        beforeDestroy(){
      
        }
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
	width: auth;
	line-height: auto;
	margin: 10px auto;
	text-align: center;
}

.bottom-tab a {
	text-decoration: none;
	color: #000000;
}
</style>