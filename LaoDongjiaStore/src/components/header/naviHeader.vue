<template>
	<div class="navi-container">
		<div class="container">
			<div class="navi-header-wrapper">
				<div class="navi-content">
					<ul>
						<li v-for="(tab, index) in tabText">
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
					{"text": "茶的种类"},
					{"text": "茶文化"}
				],
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
		color: #C0A16B;
	}
</style>