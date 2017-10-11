<template>
	<div class="loading-container">
		<img src="../../images/icon_loading_apple.gif" />
	</div>
</template>

<script>
</script>

<style>
	.loading-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 99;
	}
	
	.loading-container img {
		position: absolute;
		top: 49%;
		left: 49%;
		width: 50px;
		height: 50px;
		margin: 0 auto;
	}
</style>