<template>
	<header class="fixed-header">
		<div class="menu-wrapper">
			<ul class="navbar-ul">
				<li v-for="(tab, index) in tabText" :key="text.id" 
					@click="$emit('tabClick', index)" 
					:class="{'tab-choosed': tab.choosed}">
					{{tab.text}}
				</li>
				<!--<li id="tab-1" class="tab-choosed" onclick="tabClick(0)"><a>待付款</a></li>
				<li id="tab-2" onclick="tabClick(1)"><a>待发货</a></li>
				<li id="tab-3" onclick="tabClick(2)"><a>待收货</a></li>
				<li id="tab-4" onclick="tabClick(3)"><a>已完成</a></li>
				<li id="tab-5" onclick="tabClick(4)"><a>已取消</a></li>-->
			</ul>
		</div>				 
	</header>
</template>

<script>
	export default {
		props: {
			tabText: {
				type: Array,
				default: []
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
		min-height: 50px;
		background: #FFFFFF;
		border-radius: 3px;
		box-shadow: 2px 2px 1px #CCCCCC;
		z-index: 99;
	}
	
	.fixed-header a {
		height: 50px;
		text-decoration: none;
	}
	
	.menu-wrapper {
		width: 100%;
		margin: 0 auto;
		display: block;
	}

	.navbar-ul {
		margin: 0 auto;
		padding: 0 0 0 5px;
		text-align: center;
	}
	
	.navbar-ul li {
		width: 19%;
		margin-bottom: 3px;
		list-style: none;
		line-height: 50px;
		text-align: center;
		display: inline-block;
		
	}
	
	.navbar-ul li:hover {
		cursor: pointer;
	}
	
	.tab-choosed {
		border-bottom: 3px solid #FF4500;
	}
	
	.tab-choosed a {
		color: #FF4500;
	}
</style>