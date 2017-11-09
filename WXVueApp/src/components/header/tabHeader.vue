<template>
	<header class="fixed-header">
		<div class="menu-wrapper">
			<ul class="navbar-ul">
				<li v-for="(tab, index) in tabText" :key="tab.id" 
					@click="changeTab(index)" 
					:class="{'tab-choosed': tab.choosed}">
					{{tab.text}}
				</li>
			</ul>
		</div>				 
	</header>
</template>

<script>
	export default {
		created(){
			this.initTab(this.$route.params.pos);
		},
		props: {
			tabText: {
				type: Array,
				default: []
			}
		},
		methods: {
			changeTab(index){
				this.$emit("tabClick", index);
				for(var i=0;i<this.tabText.length;++i){
					if(i == index){
						this.tabText[i].choosed = true;
					}else{
						this.tabText[i].choosed = false;
					}
				}
			},
			initTab(index){
				for(var i=0;i<this.tabText.length;++i){
					if(i == index){
						this.tabText[i].choosed = true;
					}else{
						this.tabText[i].choosed = false;
					}
				}
			}
		}
	}
</script>

<style>
	.fixed-header {
		position: fixed;
		top: 0;
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