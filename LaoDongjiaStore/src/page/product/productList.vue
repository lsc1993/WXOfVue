<template>
	<div class="wrapper">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="product-list-container">
			<div class="container">
				<!--<div class="product-link">
					<router-link to="/"><p>首页</p></router-link>
					<span>></span>
					<p>所有商品</p>
					<span>></span>
					<p>{{type}}</p>
					<hr class="line"/>
				</div>-->
				<productLink :type="type"></productLink>
				<div class="product-type-container">
					<ul>
						<li v-for="(type, index) in productType" @click="typeClick(type.type)">
							{{type.type}}
						</li>
					</ul>
				</div>
				<div class="product-list-wrapper">
					<div class="row">
						<ul>
							<li v-for="(product, index) in productList" class="col-md-3 col-sm-3 col-xs-6">
								<productView :imgUrl="product.img" :name="product.name" :price="product.price" :pId="product.pid"></productView>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<storeFooter></storeFooter>
	</div>
</template>

<script>
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	import productView from "./productView"
	import productLink from "./productLink"
	export default {
		data () {
			return {
				type: "所有商品",
				productType: [
					{"type": "龙井茶"},
					{"type": "白茶"},
					{"type": "乌龙茶"},
					{"type": "盖碗"},
				],
				productList: [
					{
						"id": 1,
						"pid": "1",
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/s_w453h453.png"
					},
					{
						"id": 1,
						"pid": "1",
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/wrapper_pic1_1.png"
					},
					{
						"id": 1,
						"pid": "1",
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/s_w453h453.png"
					},
					{
						"id": 1,
						"pid": "1",
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/wrapper_pic1_1.png"
					},
					{
						"id": 1,
						"pid": "1",
						"name": "玄米茶",
						"describe": "高山 流水",
						"price": 120,
						"count": 99,
						"img": "../../../static/images/wrapper_pic1_1.png"
					},
					{
						"id": 1,
						"pid": "1",
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
			storeHeader, naviHeader, storeFooter, productView, productLink
		},
		methods: {
			typeClick(type){
				var t = this.getType(type);
				if(t == undefined){
					t = "all";
				}
				this.$router.push("/plist/" + t);
			},
			getType(type){
				this.type = type;
				if(type == "龙井茶"){
					return "tea";
				}
				if(type == "盖碗"){
					return "tao";
				}
			}
		}
	}
</script>

<style>
	.wrapper {
		position: relative;
		min-height: 100%;
	}
	.product-list-container {
		width: 100%;
		padding-bottom: 130px;
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
	}
	
	.product-type-container ul li:hover {
		cursor: pointer;
		color: #EEB422;
	}
	
	.product-list-wrapper {
		width: 100%;
	}
	
	.product-list-wrapper ul {
		padding: 0;
	}
	
	.product-list-wrapper ul li {
		height: auto;
		list-style: none;
		margin-top: 3%;
	}
</style>