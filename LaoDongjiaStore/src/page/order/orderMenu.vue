<template>
	<div>
		<div class="order-menu-container">
			<div class="container">
				<slideMenu></slideMenu>
				<div class="order-menu">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import slideMenu from '../user/children/slideMenu'
	export default {
		components: {
			slideMenu
		}
	}
</script>

<style>
	.order-menu-container {
		width: 100%;
	}
	
	.order-menu {
		width: 75%;
		height: 400px;
		display: inline-block;
		margin-left: 5%;
		padding: 5px;
		border: 1px solid #cccccc;
		float: left;
	}
</style>