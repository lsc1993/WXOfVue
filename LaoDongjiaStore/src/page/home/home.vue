<template>
	<div class="wrapper">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="content">
			<div class="image-turn-container">
				<div class="container">
					<div class="slide" id="image-turn">
						<ul>
							<li v-for="(image, index) in imageTurn" @click="imgTurnClick(index)">
								<img :src="image.img" />
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="product-container">
				<div class="container">
					<div class="list-container">
						<h4>商品分类</h4>
						<div>
							<ul class="row">
								<li v-for="(type, index) in productType" class="col-md-3 col-sm-6 col-xs-6">
									<div>
										<img :src="type.img" class="list-img" />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="list-container">
						<hr class="dash-line">
						<h4>新品上市</h4>
						<div>
							<ul class="row">
								<li v-for="(product,index) in productList" @click="productClick(index)" class="col-md-3 col-sm-6 col-xs-6">
									<div>
										<img :src="product.img" class="list-img" />
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="show-container">
						<div class="container">
							<div class="list-container">
								<hr class="dash-line" />
								<div class="row">
									<div class="col-md-3 col-sm-3 col-xs-6">
										<img src="../../../static/images/wrapper_pic1_1.png" class="list-img" />
									</div>
									<div class="col-md-3 col-sm-3 col-xs-6">
										<img src="../../../static/images/wrapper_pic1_2.png" class="list-img" />
									</div>
									<div class="col-md-6 col-sm-6 col-xs-12">
										<img src="../../../static/images/wrapper_pic1_3.png" class="list-img" />
									</div>
								</div>
								<div class="row">
									<div class="col-md-8 col-sm-8 col-xs-12">
										<img src="../../../static/images/wrapper_pic2_1.png" class="list-img" />
									</div>
									<div class="col-md-4 col-sm-4 col-xs-12">
										<img src="../../../static/images/wrapper_pic2_2.png" class="list-img" />
									</div>
								</div>
							</div>
						</div>
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
	export default {
		data () {
			return {
				productList: [
					{"img": "../../../static/images/index_slide_2.png", "pid": "T201709082001"},
					{"img": "../../../static/images/index_slide_1.png", "pid": "T201709082001"},
					{"img": "../../../static/images/index_slide_3.png", "pid": "T201709082001"},
					{"img": "../../../static/images/index_slide_2.png", "pid": "T201709082001"},
				],
				productType: [
					{"img": "../../../static/images/index_slide_3.png", "type": "茶"},
					{"img": "../../../static/images/index_slide_1.png", "type": "茶"},
					{"img": "../../../static/images/index_slide_3.png", "type": "茶"},
					{"img": "../../../static/images/index_slide_2.png", "type": "茶"},
				],
				imageTurn: [
					{"img": "../../../static/images/index_slide_1.png", "imgLink": "T201704052001"},
					{"img": "../../../static/images/index_slide_3.png", "imgLink": "T201704052001"},
					{"img": "../../../static/images/index_slide_2.png", "imgLink": "T201704052001"},
				]
			}
		},
		mounted () {
			$("#image-turn").swipeSlide();
		},
		components: {
			storeHeader, naviHeader, storeFooter
		},
		methods: {
			imgTurnClick(index){
				this.$router.push("/product/" + this.imageTurn[index].imgLink);
			},
			productClick(index){
				this.$router.push("/product/" + this.productList[index].pid);
			}
		}
	}
</script>

<style>
	.wrapper {
		position: relative;
	}
	
	.content {
		padding-bottom: 130px;
	}
	
	.dash-line {
		width: 100%;
		color: #5E5E5E;
		border: 1px;
		border-style: dashed;
	}
	
	img:hover {
		cursor: pointer;
	}
	
	.image-turn-container {
		position: relative;
		background: #f4efe7;
		padding-bottom: 50px;
	}
	
	.product-container {
		width: 100%;
		background: #fcfbf7;
	}
	
	.list-container {
		width: 100%;
		text-align: left;
		margin-top: 50px;
		padding: 0;
	}
	
	.list-container ul {
		width: 100%;
		padding: 0;
	}
	
	.list-container ul li {
		list-style: none;
		margin: 30px auto;
	}
	
	.list-img {
		width: 100%;
	}
</style>