<template>
	<div>
		<div class="product-link">
			<router-link to="/">
				<p>首页</p>
			</router-link>
			<span>></span>
			<router-link to="/plist/all">
				<p>所有商品</p>
			</router-link>
			<span>></span>
			<p>{{type}}</p>
			<hr class="line" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.product-link {
		width: 100%;
		text-align: left;
	}
	
	.product-link a {
		color: #000000;
	}
	
	.product-link a:hover {
		color: #EEB422;
	}
	
	.product-link p {
		display: inline-block;
	}
	
	.line {
		height: 1px;
		margin-top: 0;
		color: #CCCCCC;
		border: 0.1px solid;
	}
</style>