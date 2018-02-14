<template>
	<div class="order-wrapper">
		<tabHeader @tabClick="onTabClick" :tabText="tabTexts"></tabHeader>
		<router-view></router-view>
	</div>
</template>

<script>
	import tabHeader from '../../components/header/tabHeader'
	export default {
		data () {
			return {
				tabTexts: [
					{"text": "待发货", "choosed": false},
					{"text": "待收货", "choosed": false},
					{"text": "已完成", "choosed": false},
					{"text": "已取消", "choosed": false},
				]
			}
		},
		components: {
			tabHeader
		},
		methods: {
			onTabClick(index){
				if(index==0){
					this.$router.replace("/orderlist/0");
				}else if(index == 1){
					this.$router.replace("/orderlist/1");
				}else if(index == 2){
					this.$router.replace("/orderlist/2");
				}else if(index == 3){
					this.$router.replace("/orderlist/3");
				}
			}
		}
	}
</script>

<style>
	.order-wrapper {
		position: relative;
	}
</style>