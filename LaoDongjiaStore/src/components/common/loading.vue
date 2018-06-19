<template>
	<div class="loading-container" v-show="show">
		<img src="../../../static/images/icon-loading-apple.gif" />
	</div>
</template>

<script>
	export default {
		props: {
			show:{
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>
	.loading-container {
		position: fixed;
		top: 45%;
		left: 50%;
		width: 50px;
		height: 50px;
		margin-left: -25px;
		margin-top: -25px;
		background: rgba(0,0,0,0.4);
		transition: 0.3s ease;
		z-index: 100;
	}
	
	.loading-container img {
		width: 30px;
		height: 30px;
		margin: 10px auto;
	}
</style>