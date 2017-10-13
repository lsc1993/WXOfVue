<template>
	<div class="fixed-header">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<div class="menu-wrapper">
						<router-link to="/">
							<i class="icon-angle-left icon-2x"></i>
						</router-link>
						<p class="title-center">{{title}}</p>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			}
		}	
	}
</script>

<style>
	.fixed-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 50px;
		background: #FFFFFF;
		border-radius: 3px;
		box-shadow: 2px 2px 1px #CCCCCC;
		z-index: 99;
	}
	
	.fixed-header a {
		width: auto;
		line-height: 50px;
		color: #4D4D4D;
		text-decoration: none;
		float: left;
	}
	
	.fixed-header i {
		width: 10%;
		line-height: 50px;
	}
	
	.fixed-header p {
		line-height: 50px;
		text-align: center;
		font-weight: 400;
		font-size: 18px;
		padding-right: 5%;
	}
</style>