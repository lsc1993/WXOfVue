<template>
	<div class="navi-container">
		<div class="container">
			<div class="navi-header-wrapper">
				<div class="navi-content">
					<ul>
						<li v-for="(tab, index) in tabText" @click="tabClick(index)">
							{{tab.text}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				tabText: [
					{"text": "首页"},
					{"text": "所有产品"},
					{"text": "产品分类"},
					{"text": "风物日记"}
				],
			}
		},
		methods: {
			tabClick(index){
				if(index == 0){
					this.$router.push("/");
					return;
				}
				if(index == 1){
					this.$router.push("/plist/all");
					return;
				}
				if(index == 2){
					this.$router.push("/user/mine");
				}
			}
		}
	}
</script>

<style>
	.navi-container {
		position: relative;
		width: 100%;
	}
	
	.navi-header-wrapper {
		width: 100%;
		height: 50px;
		margin-top: 80px;
	}
	
	.navi-content {
		width: auto;
		float: left;
	}
	
	.navi-content ul {
		padding: 0;
		list-style: none;
	}
	
	.navi-content ul li {
		width: auto;
		text-align: center;
		display: inline-block;
		margin-right: 20px;
	}
	
	.navi-content ul li:hover {
		cursor: pointer;
		color: #EEB422;
	}
</style>