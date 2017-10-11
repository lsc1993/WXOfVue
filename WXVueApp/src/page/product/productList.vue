<template>
	<div id="product-wrapper" class="product-container">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<ul class="product-ul">
						<li v-for="(product, index) in products" :key="product.id" @click="gotoProduct(index)">
							<img :src="product.img" />
							<p>{{$route.params.id}}</p>
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
				products:[
					{img: "/static/images/20172001.jpg"},
				]
			}
		},
		methods: {
			gotoProduct(index){
				
			}
		},
		watch: {
			'$route'(to, from){
				if(this.$route.params.id == 1){
					//this.products.push({img: "/static/images/20172001.jpg"});
				}
			}
		}
	}
</script>

<style>
	.product-container {
		margin-bottom: 55px;
	}
	
	.product-ul {
		width: 100%;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}
	
	.product-ul li {
		width: 100%;
		height: 20%;
		margin: 0 auto;
		margin-top: 5%;
		display: inline-block;
		list-style: none;
	}
	
	.product-ul li img {
		width: 100%;
		height: 20%;
		border-radius: 5px;
		box-shadow: 2px 2px 2px #8C8C8C;
	}
</style>