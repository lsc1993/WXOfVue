<template>
	<div>
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="product-detail-container">
			<div class="container">
				<div class="product-link">
					<p>首页<span>></span></p>
					<p>所有商品<span>></span></p>
					<p>茶</p>
					<hr class="line"/>
				</div>
				<div class="product-detail">
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="product-image">
								<img :src="preview" />
							</div>
							<div class="product-image-preview">
								<ul>
									<li v-for="(pImage, index) in productImg">
										<img :src="pImage.img" />
									</li>
								</ul>
							</div>
						</div>
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
	export default {
		data () {
			return {
				preview : "../../../static/images/s_w453h453.png",
				productImg: [
					{"img": "../../../static/images/s_w453h453.png"},
					{"img": "../../../static/images/s_w453h454.png"}
				]
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter
		}
	}
</script>

<style>
	.product-detail-container {
		width: 100%;
	}
	
	.product-link {
		width: 100%;
		text-align: left;
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
	
	.product-image {
		background: rgba(0,0,0,0.1);
	}
</style>