<template>
	<div class="wrapper">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<div class="product-detail-container">
			<div class="container">
				<productLink :type="product.name"></productLink>
				<div class="product-detail">
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="product-image">
								<img :src="preview" />
							</div>
							<div class="product-image-preview">
								<ul>
									<li v-for="(pImage, index) in product.imgTurn" @click="imageClick(index)">
										<img :src="pImage.img" />
									</li>
								</ul>
							</div>
						</div>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="product-describe-container">
								<p class="product-name-font">{{product.name}}</p>
								<p class="product-describe-font">{{product.describe}}</p>
							</div>
							<div class="product-price-container">
								<p class="product-name-font">￥</p>
								<p class="product-name-font">{{product.price}}</p>
								<hr class="line" />
							</div>
							<div class="product-sale-count">
								<p>选择数量:</p>
								<div class="product-count-caculator">
									<p @click="subCount()">-</p>
									<p>{{count}}</p>
									<p @click="addCount()">+</p>
								</div>
							</div>
							<div class="product-standard-container">
								<p>规格:</p>
								<div>
									<ul>
										<li v-for="(std,index) in product.standards" 
											:key="std.id" 
											@click="chooseStandard(index)" 
											:class="{'product-standard-choosed' : std.choosed, 'product-standard-unchoosed' : !std.isChoosed}">
											{{std.standard}}
										</li>
									</ul>
								</div>
							</div>
							<div class="product-trade-container">
								<button class="product-shop-button">加入购物车</button>
								<button class="product-buy-button" @click="buyNow()">立即购买</button>
							</div>
						</div>
					</div>
				</div>
				<div class="product-command-container">
					<h4>商品详情</h4>
					<ul>
						<li v-for="(cImg, index) in productCommand" class="col-md-3 col-sm-3 col-xs-6">
							<img :src="cImg.img" />
						</li>
					</ul>
				</div>
				<div class="product-detail-wrapper">
					<ul>
						<li v-for="(dImg, index) in product.imgDesc" class="col-md-12 col-sm-12 col-xs-12">
							<img :src="dImg.img" />
						</li>
					</ul>
				</div>
			</div>
		</div>
		<storeFooter></storeFooter>
		<toast :show="showTip" :message="tip"></toast>
	</div>
</template>

<script>
	import {mapMutations} from "vuex"
	import toast from "../../components/common/toast"
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	import productLink from "./productLink"
	export default {
		data () {
			return {
				count: 1,
				showTip: false,
				tip: "",
				preview: "../../../static/images/s_w453h453.png",
				product: {
					"id": 1,
					"pid": 1,
					"name": "玄米茶",
					"describe": "高山 流水",
					"price": 120,
					"count": 99,
					"imgname": "s_w453h453.png",
					"imgIndex": "../../../static/images/s_w453h453.png",
					"imgDesc": [
						{"img": "../../../static/images/s.jpeg"},
						{"img": "../../../static/images/s_w453h453.png"},
						{"img": "../../../static/images/s_w453h454.png"}
					],
					"imgTurn": [
						{"img": "../../../static/images/s_w453h453.png"},
						{"img": "../../../static/images/s_w453h454.png"}
					],
					"standards": [
						{"sId": "1" ,"standard": "100克", "price": 100, "choosed": false},
						{"sId": "1" ,"standard": "200克", "price": 200, "choosed": false},
						{"sId": "1" ,"standard": "300克", "price": 300, "choosed": false}
					]
				},
				productCommand: [
					{"img": "../../../static/images/s_w453h453.png"},
					{"img": "../../../static/images/s_w453h454.png"},
					{"img": "../../../static/images/s_w453h453.png"},
					{"img": "../../../static/images/s_w453h454.png"}
				]
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter, toast, productLink
		},
		methods: {
			...mapMutations([
				"ADD_ORDER", "CLEAR_ORDER"
			]),
			imageClick(index){
				this.preview = this.product.imgTurn[index].img;
			},
			chooseStandard(index){
				var length = this.product.standards.length;
				for(var i = 0;i < length;++i){
					var std;
					if(i == index){
						this.product.standards[i].choosed = true;
						this.product.price = this.product.standards[i].price;
					} else {
						this.product.standards[i].choosed = false;
					}
				}
			},
			addCount(){
				if(this.count < this.product.count){
					this.count++;
				}else{
					this.showToast("不能买更多了~");
				}
			},
			subCount(){
				if(this.count > 1){
					this.count--;
				}
			},
			buyNow(){
				var standard,price,sId;
				var chooseStd = false;
				var len = this.product.standards.length;
				for(var i=0;i < len;++i){
					var std = this.product.standards[i];
					if(std.choosed){
						sId = std.sId;
						price = std.price;
						standard = std.standard;
						chooseStd = true;
						break;
					}
				}
				if(!chooseStd){
					this.showToast("请选择规格");
					return;
				}
				var order = {
					"pId": this.product.pId,
					"image": this.product.imgIndex,
					"imgname": this.product.imgname,
					"name": this.product.name,
					"sId": sId,
					"price": price,
					"count": this.count,
					"standard": standard,
					"total": parseFloat(price) * this.count
				};
				this.CLEAR_ORDER();
				this.ADD_ORDER(order);
				this.$router.push("/order");
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showTip = true;
				setTimeout(function(){
					self.showTip = false;
				},2000);
			},
		}
	}
</script>

<style>
	.wrapper {
		position: relative;
		min-height: 100%;
	}
	
	.product-detail-container {
		width: 100%;
		padding-bottom: 130px;
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
	
	/**
	 * 产品图片以及预览图样式
	 * */
	.product-image {
		width: 80%;
		height: 420px;
		background: rgba(0,0,0,0.1);
	}
	
	.product-image img {
		width: 100%;
		max-height: 400px;
	}
	
	.product-image-preview {
		width: auto;
		margin-top: 20px;
	}
	
	.product-image-preview ul {
		padding: 0;
		float: left;
	}
	
	.product-image-preview ul li {
		list-style: none;
		display: inline-block;
		margin-right: 15px;
	}
	
	.product-image-preview ul li img {
		width: 70px;
		
	}
	
	.product-image-preview ul li:hover {
		background: rgba(0,0,0,0.2);
	}
	
	/**
	 * 产品信息样式
	 * */
	.product-describe-container {
		width: 100%;
		text-align: left;
	}
	
	.product-name-font {
		font-size: 20px;
		font-weight: bold;
	}
	
	.product-describe-font {
		color: #CCCCCC;
	}
	
	/**
	 * 产品价格样式
	 * */
	.product-price-container {
		width: 80%;
		text-align: left;
		margin-top: 15px;
	}
	
	.product-price-container p {
		display: inline-block;
	}
	
	/**
	 * 产品数量样式
	 * */
	.product-sale-count {
		width: 100%;
		height: auto;
		text-align: left;
	}
	
	.product-sale-count p {
		width: auto;
		font-size: 16px;
		display: inline-block;
	}
	
	.product-count-caculator {
		width: auto;
		margin-left: 20px;
		display: inline-block;
		text-align: center;
	}
	.product-count-caculator p {
		width: 25px;
		height: 25px;
		font-size: 16px;
		font-weight: 400;
		border: 1px solid #CCCCCC;
		border-radius: 1px;
	}
	
	.product-count-caculator p:hover {
		cursor: pointer;
	}
	
	/**
	 * 交易按钮样式
	 * */
	.product-trade-container {
		width: 100%;
		margin-top: 40px;
	}
	
	.product-buy-button {
		width: 45%;
		height:45px;
		color: #ffffff;
		background: #f0ad4e;
		border: hidden;
		border-radius: 5px;
	}
	
	.product-shop-button {
		width: 45%;  
		height:45px;
		color: #ffffff;
		background: #d40f0f;
		border: hidden;
		border-radius: 5px;
		float: left;
	}
	
	/**
	 * 产品规格样式
	 * */
	.product-standard-container {
		width: 100%;
	}
	
	.product-standard-container p {
		text-align: left;
	}
	
	.product-standard-container ul {
		list-style: none;
		padding: 0;
		text-align: left;
	}
	
	.product-standard-container ul li {
		width: auto;
		display: inline-block;
		margin-right: 5%;
		cursor: pointer;
	}
	
	.product-standard-unchoosed {
		border: 1px solid #CCCCCC;
	}
	
	.product-standard-choosed {
		border: 1px solid #EEA236;
	}
	
	/**
	 * 产品推荐样式
	 * */
	.product-command-container {
		margin-top: 50px;
		padding: 0;
	}
	
	.product-command-container ul {
		width: 100%;
		padding: 0;
	}
	
	.product-command-container ul li {
		list-style: none;
		margin: 30px auto;
	}
	
	.product-command-img {
		width: 100%;
	}
	
	/** 
	 * 产品描述样式
	 * */
	.product-detail-wrapper {
		width: 100%;
		margin-top: 10%;
	}
	
	.product-detail-wrapper ul {
		padding: 0;
	}
	
	.product-detail-wrapper ul li {
		list-style: none;
	}
	
	.product-detail-wrapper ul li img {
		width: auto;
		max-width: 100%;
	}
	
	/** 
	 * 产品推荐样式
	 * */
	.product-command-container {
		width: 100%;
	}
	
	.product-command-container ul {
		padding: 0;
	}
	
	.product-command-container ul li {
		list-style: none;
	}
	
	.product-command-container ul li img {
		width: 100%;
	}
</style>