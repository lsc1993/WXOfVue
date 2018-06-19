<template>
	<div class="order-menu-wrapper">
		<div class="order-menu-container">
			<div class="container">
				<slideMenu></slideMenu>
				<div class="order-menu">
					<h4>我的订单</h4>
					<div class="tab-header-container">
						<div class="order-tab-header">
							<div class="order-tab-wrapper">
								<ul class="order-tab-ul">
									<li v-for="(tab, index) in tabTexts" :key="tab.id" @click="changeTab(index)" :class="{'tab-choosed': tab.choosed}">
										{{tab.text}}
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div>
						<orderList :orderStatus="status"></orderList>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import slideMenu from '../user/children/slideMenu'
	import orderList from './orderList'
	export default {
		data () {
			return {
				status: "waitSend",
				tabTexts: [
					{"text": "待发货", "choosed": true},
					{"text": "待收货", "choosed": false},
					{"text": "已完成", "choosed": false},
					{"text": "已取消", "choosed": false},
				]
			}
		},
		components: {
			slideMenu, orderList
		},
		methods: {
			changeTab(index){
				for(var i=0;i<this.tabTexts.length;++i){
					if(i == index){
						this.tabTexts[i].choosed = true;
					}else{
						this.tabTexts[i].choosed = false;
					}
				}
				if(index==0){
					this.status = "waitSend";
					return;
				}else if(index == 1){
					this.status = "waitReceive";
					return;
				} else if(index == 2){
					this.status = "complete";
					return;
				}else if(index == 3){
					this.status = "cancel";
					return;
				}
			},
		}
	}
</script>

<style>
	.order-menu-wrapper {
		position: relative;
	}
	
	.order-menu-container {
		position: relative;
		width: 100%;
		padding-bottom: 130px;
	}
	
	.order-menu {
		position: relative;
		width: 75%;
		height: auto;
		display: inline-block;
		padding: 5px;
		border: 1px solid #cccccc;
		border-radius: 3px;
	}
	
	.order-menu h4 {
		font-size: 22px;
		font-weight: 600;
		text-align: left;
	}
	
	.tab-header-container {
		position: relative;
		height: auto;
	}
	
	.order-tab-header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background: #FFFFFF;
		border-radius: 3px;
		box-shadow: 0 0 2px #CCCCCC;
		z-index: 1;
	}
	
	.order-tab-header a {
		height: 50px;
		text-decoration: none;
	}
	
	.order-tab-wrapper {
		width: 100%;
		margin: 0 auto;
		display: block;
	}

	.order-tab-ul {
		margin: 0 auto;
		padding: 0 0 0 5px;
		text-align: center;
	}
	
	.order-tab-ul li {
		width: 19%;
		margin-bottom: 3px;
		list-style: none;
		line-height: 50px;
		text-align: center;
		display: inline-block;
		
	}
	
	.order-tab-ul li:hover {
		cursor: pointer;
	}
	
	.tab-choosed {
		border-bottom: 3px solid #FF4500;
	}
	
	.tab-choosed a {
		color: #FF4500;
	}
</style>