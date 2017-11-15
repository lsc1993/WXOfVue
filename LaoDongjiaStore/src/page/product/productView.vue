<template>
	<div>
		<div class="product-view-container">
			<img :src="imgUrl" />
			<div class="product-view-msg">
				<p>{{name}}</p>
				<p>￥{{price}}</p>
			</div>
			<div class="product-action-container">
				<router-link to="/"><i class="icon-shopping-cart icon-large"></i></router-link>
				<a><i class="icon-eye-open icon-large" @click="showDetail()"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			pId: {
				type: String,
				default: ""
			},
			imgUrl: {
				type: String,
				default: ""
			},
			name: {
				type: String,
				default: ""
			},
			price: {
				type: Number,
				default: 0.0
			}
		},
		methods: {
			showDetail(){
				this.$router.push("/product/" + this.pId);
			}
		}
	}
</script>

<style>
	.product-view-container {
		width: 90%;
		margin: 0 auto;
		border-radius: 5px;
	}
	
	.product-view-container:hover .product-action-container {
		opacity: 1;
	}
	
	.product-view-container img {
		width: 100%;
		max-height: 180px;
	}
	
	.product-view-msg {
		width: 100%;
		margin-top: 20px;
	}
	
	.product-view-msg p {
		font-size: 18px;
	}
	
	.product-action-container {
		position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    width: 80%;
	    height: 100%;
	    margin: 0 auto;
	    background: rgba(0, 0, 0, 0.3) none repeat scroll 0 0;
	    border: 1px solid #fff;
	    display: inline-block;
	    text-align: center;
	    vertical-align: top;
	    transition: all .3s ease-in;
	    -webkit-transition: all .3s ease-in;
	    z-index: 10;
	    opacity: 0;
	}
	
	.product-action-container a {
		position: relative;
	    width: 50px;
	    height: 50px;
	    margin-top: 45%;
	    color: #fff;
	    display: inline-block;
	    font-size: 18px;
	    font-weight: 400;
	    text-align: center;
	    text-decoration: none;
	}
	
	.product-action-container a:hover {
		color:#ffae00;
	}
	
	.product-action-container a:before { 
		position: absolute;
		right: 0;
		top: 30%;
		width: 1px;
		height: 17px;
		content: "";
		margin-top: -8.5px;
		background: #d9d9d9 none repeat scroll 0 0;
	}
	
	.product-action-container a:last-child:before {
		display:none;
	}
</style>