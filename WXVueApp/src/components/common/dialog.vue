<template>
	<transition name="dialog">
		<div class="dialog-modal-mask" v-show="showDialog">
			<div class="dialog-modal-wrapper">
				<div class="dialog-modal-container"> 
					<div class="dialog-header">
						{{title}}
					</div>
					<div class="dialog-content">
						{{message}}
					</div>
					<div class="dialog-footer">
						<slot name="dialog-footer">
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			showDialog: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ""
			},
			message: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.dialog-modal-mask {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: table;
	    transition: opacity .3s ease;
		-webkit-transition: .3s ease;
	}
	
	.dialog-modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}
	
	.dialog-modal-container {
	    width: 90%;
		height: auto;
		margin: 0px auto;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}
	
	.dialog-header {
		height: 45px;
		margin-top: 0;
		color: #42b983;
		text-align: center;
		font-size: medium;
		font-weight: 400;
		padding: 15px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.dialog-content {
		min-height: 80px;
		max-height: 220px;
	    margin: 0 0 10px 0;
	    padding: 10px;
	    border-bottom: 1px solid #CCCCCC;
	    overflow-y: scroll;
	    text-align: left;
	}
	
	.dialog-content::-webkit-scrollbar {
		display: none;
	}
	
	.dialog-footer {
		width: 100%;
		height: 30px;
	    display: inline-block;	
	}
	
	.dialog-button-right {
		width: 50%;
		line-height: 30px;
		text-align: center;
		color: #46B8DA;
	    float: right;
	    padding-left: 5%;
	}
	
	.dialog-button-left {
		width: 50%;
		line-height: 30px;
		text-align: center;
		color: #ADADAD;
	    float: left;
	    padding-right: 5%;
	    border-right: 1px solid #CCCCCC;
	}
	
	.dialog-button-middle {
		width: 100%;
		line-height: 25px;
		text-align: center;
		color: #46B8DA;
	}
	
	.dialog-enter {
		opacity: 0;
	}
	
	.dialog-leave-active {
		opacity: 0;
	}
	
	.dialog-enter .dialog-modal-container,
	.dialog-leave-active .dialog-modal-container {
		transform: scale(1.1);
		-webkit-transform: scale(1.1);
	}
</style>