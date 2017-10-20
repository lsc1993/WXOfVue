<template>
	<div class="loading-container">
		<img src="/static/images/icon-loading-apple.gif" />
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.loading-container {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 50px;
		height: 50px;
		margin-left: -25px;
		margin-top: -25px;
		background: rgba(0,0,0,0.5);
		transition: 0.2s ease;
		z-index: 100;
	}
	
	.loading-container img {
		width: 30px;
		height: 30px;
		margin: 0 auto;
	}
</style>