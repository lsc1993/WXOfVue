<template>
	<div class="fixed-header">
		<div class="navi-wrapper">
			<div class="navi-container">
				<div class="left-navi-btn-selected col-md-6 col-sm-6 col-xs-6" id="left-tab" @click="clickLeftTab()">
					{{leftTabText}}
				</div>
				<div class="right-navi-btn-unselected col-md-6 col-sm-6 col-xs-6" id="right-tab" @click="clickRightTab()">
					{{rightTabText}}
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
				this.$router.push({path: "/plist/tea"});
			},
			clickRightTab(){
				$("#left-tab").removeClass("left-navi-btn-selected").addClass("left-navi-btn-unselected");
				$("#right-tab").removeClass("right-navi-btn-unselected").addClass("right-navi-btn-selected");
				this.$router.push({path: "/plist/tao"});
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
		width: 60%;
		height: auto;
		display: table-cell;
		vertical-align: middle;
	}
	
	.navi-container {
		width: 60%;
		height: 32px;
		display: inline-block;
		border: 1px solid #f8575c;
		border-radius: 5px;
	}
	
	.left-navi-btn-selected {
		height: 30px;
		display: inline-block;
		background: #f8575c;
		color: #ffffff;
		padding-top: 5px;
	}
	
	.left-navi-btn-unselected {
		height: 30px;
		display: inline-block;
		color: #f8575c;
		padding-top: 5px;
	}
	
	.right-navi-btn-selected {
		height: 30px;
		display: inline-block;
		background: #f8575c;
		color: #ffffff;
		padding-top: 5px;
	}
	
	.right-navi-btn-unselected {
		height: 30px;
		display: inline-block;
		color: #f8575c;
		padding-top: 5px;
	}
</style>