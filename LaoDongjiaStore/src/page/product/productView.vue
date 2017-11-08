<template>
	<div>
		<div class="product-view-container">
			<img :src="imgUrl" />
			<div class="product-view-msg">
				<p>{{name}}</p>
				<p>￥{{price}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			imgUrl: {
				type: String,
				default: ""
			},
			name: {
				type: String,
				default: ""
			},
			price: {
				type: Number,
				default: 0.0
			}
		}
	}
</script>

<style>
	.product-view-container {
		width: 100%;
	}
	
	.product-view-container img {
		width: 100%;
	}
	
	.product-view-msg {
		width: 100%;
		margin-top: 20px;
	}
	
	.product-view-msg p {
		font-size: 18px;
	}
</style>