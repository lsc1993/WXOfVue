<template>
	<div class="fixed-header">
		<div class="navi-wrapper">
			<div class="navi-container">
				<div class="left-navi-btn-selected" id="left-tab" @click="clickLeftTab()">
					<p id="left-tab-text">{{leftTabText}}</p>
				</div>
				<div class="right-navi-btn-unselected" id="right-tab" @click="clickRightTab()">
					<p id="right-tab-text">{{rightTabText}}</p>
				</div>
			</div>
		</div>
	</div>
</template> 

<script>
	export default {
		data () {
			return {
				leftTabText : "标签一",
				rightTabText: "标签二"
			}
		},
		methods: {
			clickLeftTab(){
				$("#right-tab").removeClass("right-navi-btn-selected").addClass("right-navi-btn-unselected");
				$("#left-tab").removeClass("left-navi-btn-unselected").addClass("left-navi-btn-selected");
				this.$router.push({path: "/product/tea", params: {id: "1"}});
			},
			clickRightTab(){
				const id = 1;
				$("#left-tab").removeClass("left-navi-btn-selected").addClass("left-navi-btn-unselected");
				$("#right-tab").removeClass("right-navi-btn-unselected").addClass("right-navi-btn-selected");
				this.$router.push({path: "/product/tao"});
			}
		}
	}
</script>

<style>
	.fixed-header {
		position: fixed;
		top: 2px;
		left: 0;
		right: 0;
		width: 100%;
		min-height: 50px;
		display: table;
		background: #FFFFFF;
		border-radius: 3px;
		box-shadow: 2px 2px 1px #CCCCCC;
		z-index: 99;
	}
	
	.navi-wrapper {
		width: 50%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
		margin: 0px auto;
	}
	
	.navi-container {
		width: 50%;
		height: 32px;
		display: inline-block;
		margin: 0px auto;
		border: 1px solid #f8575c;
		border-radius: 5px;
	}
	
	.navi-container p {
		margin-top: 5px;
		font-size: 16px;
	}
	
	.left-navi-btn-selected {
		width: 50%;
		height: 30px;
		display: inline-block;
		background: #f8575c;
		color: #ffffff;
	}
	
	.left-navi-btn-unselected {
		width: 49%;
		height: 30px;
		display: inline-block;
		color: #f8575c;
	}
	
	.right-navi-btn-selected {
		width: 50%;
		height: 30px;
		display: inline-block;
		background: #f8575c;
		color: #ffffff;
	}
	
	.right-navi-btn-unselected {
		width: 49%;
		height: 30px;
		display: inline-block;
		color: #f8575c;
	}
</style>