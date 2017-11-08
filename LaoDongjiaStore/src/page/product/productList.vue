<template>
	<div>
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="product-list-container">
			<div class="container">
				<div class="product-link">
					<router-link to="/"><p>首页</p></router-link>
					<span>></span>
					<p>所有商品</p>
					<span>></span>
					<p>茶</p>
					<hr class="line"/>
				</div>
				<div class="product-type-container">
					<ul>
						<li v-for="(type, index) in productType">
							{{type.type}}
						</li>
					</ul>
				</div>
				<div class="product-list-wrapper">
					<div class="row">
						<ul>
							<li v-for="(product, index) in productList" class="col-md-3 col-sm-3 col-xs-6">
								<productView :imgUrl="product.img" :name="product.name" :price="product.price"></productView>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	import productView from "./productView"
	export default {
		data () {
			return {
				productType: [
					{"type": "龙井茶"},
					{"type": "白茶"},
					{"type": "乌龙茶"},
					{"type": "盖碗"},
				],
				productList: [
					{
						"id": 1,
						"pid": 1,
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/s_w453h453.png"
					},
					{
						"id": 1,
						"pid": 1,
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/wrapper_pic1_1.png"
					},
				]
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter, productView
		}
	}
</script>

<style>
	.product-list-container {
		width: 100%;
	}
	
	.product-type-container {
		width: 100%;
		border: 1px #CCCCCC solid;
		display: inline-block;
		padding: 1%;
	}
	
	.product-type-container ul {
		display: inline-block;
		padding: 0;
		float: left;
	}
	
	.product-type-container ul li {
		list-style: none;
		display: inline-block;
		margin-right: 15px;
		vertical-align: middle;
	}
	.product-link { 
		width: 100%;
		text-align: left;
	}
	
	.product-link a {
		color: #000000;
	}
	
	.product-link a:hover {
		color: #EEB422;
	}
	
	.product-link p {
		display: inline-block;
	}
	
	.line {
		height: 1px;
		margin-top: 0;
		color: #CCCCCC;
		border: 0.1px solid;
	}
	
	.product-list-wrapper {
		width: 100%;
		margin-top: 45px;
	}
	
	.product-list-wrapper ul {
		padding: 0;
	}
	
	.product-list-wrapper ul li {
		height: auto;
		list-style: none;
		box-shadow: 0 0 1px #CCCCCC;
		border-radius: 5px;
		padding: 1%;
		margin-right: 3%;
	}
	
	.product-list-wrapper ul li img {
		width: 90%;
		max-height: 180px;
	}
	
	.product-list-wrapper ul li:hover {
		background: rgba(0, 0, 0, 0.1);
	}
</style>