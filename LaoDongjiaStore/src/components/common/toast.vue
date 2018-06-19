<template>
	<div>
		<transition name="toast">
			<div class="toast-wrapper" v-show="show">
				<div class="toast-container">
					{{message}}
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		props:{
			show: {
				type: Boolean,
				default: false
			},
			message: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.toast-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 10%;
		width: 100%;
		height: auto;
		min-height: 20px;
		display: table;
		text-align: center;
		transition: opacity .3s ease;
		z-index: 100;
	}
	
	.toast-container {
		width: auto;
		max-width: 80%;
		height: auto;
		display: inline-block;
		margin: 0 auto;
		background: rgba(0,0,0,0.5);
		color: #ffffff;
		border-radius: 5px;
		padding: 1%;
		transition: all .3s ease;
		text-align: center;
	}
	
	.toast-enter-active {
		opacity: 0;
		transition: ease-in;
	}
	
	.toast-leave-active{
		opacity: 0;
		transition: 0.5s ease-out;
	}
</style>