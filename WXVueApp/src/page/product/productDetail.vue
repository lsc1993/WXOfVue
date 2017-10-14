<template>
	<div>
		<backHeader :title="title"></backHeader>
		<div class="space"></div>
		<div class="product-container">
			<div class="product-wrapper">
				<div class="slide" id="product-image-turn">
					<ul>
						<li v-for="img in product.imgTurn" :key="img.id">
							<img :src="img.img" />
						</li>
					</ul>
				</div>
				<div class="product-price-label">
					<p class="price-text-small">￥</p>
					<p class="price-text-large">{{product.price}}</p>
				</div>
				<div class="product-name-label">
					<p>{{product.describe}}</p>
				</div>
				<div class="product-sales-volume">
					<div class="product-transport-fare">
						<p>运费：</p><p>{{product.delivery}}</p>
					</div>
					<div class="product-sales-fare">
						<p>销量：</p><p>{{product.saleVolume}}</p>
					</div>
				</div>
				<div class="product-standard" @click="chooseStandard()">
					<div>
						<p>选择：规格</p>
						<i class="icon-angle-right icon-large"></i>
					</div>
				</div>
				<div class="product-detail-appraise">
					<div class="product-detail-appraise-title">
						<p>商品详情</p>
						<!--<p :class="{'product-tab-title-bottom-line' : isDetail}"
								@click="showProductDetail()">商品详情</p>-->
						<!--<p :class="{'product-tab-title-bottom-line' : isAppraise}"
								@click="showProductAppraise()">销量和评价</p>-->
					</div>
					<div class="product-detail-appraise-container">
						<div class="product-detail-container">
							<ul>
								<li v-for="img in product.imgDesc" :key="img.id">
									<img :src="img.img"/>
								</li>
							</ul>
						</div>
						<!--<div class="product-appraise-container" v-show="isShowAppraise">
							<div class="product-appraise-content">
								<div class="product-appraise-user container">
									<ul>
										<li v-for="(appraise,index) in userappraise" :key="appraise.id">
											<div class="row">
												<div class="col-md-2 col-sm-2 col-xs-3">
													<img :src="appraise.img"/>
												</div>
												<div class="col-md-10 col-sm-10 col-xs-9">
													<p>{{appraise.name}}</p>
													<p>{{appraise.time}}</p>
												</div>
												<div class="col-md-12 col-sm-12 col-xs-12">
													<p>{{appraise.appraise}}</p>
												</div>
												<div class="product-appraise-return col-md-12 col-sm-12 col-xs-12">
													<p v-if="showSellerReturn(index)">{{appraise.feedback}}</p>
												</div>
											</div>
										</li>		
									</ul>
								</div>
							</div>
						</div>-->
					</div>
				</div>
			</div>
			<!--页面底部选项-->
			<footer class="fixed-footer">
				<div class="fixed-footer-wrapper">
					<div class="footer-tab-btn1" @click="gotoShopCart()">
						<i class="icon-shopping-cart"></i>
						<p>购物车</p>
					</div>
					<div class="footer-tab-btn3">
						<p @click="chooseStandard()">立即购买</p>
					</div>
					<div class="footer-tab-btn2">
						<p @click="chooseStandard()">加入购物车</p>
					</div>
				</div>
			</footer>
		</div>
		<productStd :showWindow="showStdWindow" @close="removeWindow()"></productStd>
	</div>
	
</template>

<script>
	import {mapMutations} from 'vuex'
	import backHeader from '../../components/header/backHeader'
	import productStd from './productStandard'
	export default {
		data () {
			return {
				title: "产品",
				showStdWindow: false,
				product: {}
			}
		},
		created(){
			this.initProduct();
		},
		components: {
			backHeader,
			productStd
		},
		methods: {
			...mapMutations([
				"SET_PRODUCT_DETAIL"
			]),
			initProduct(){
				this.product = {
					id:"123",
					pId:"2312",
					name:"红茶",
					describe:"红茶儿",
					price:"99",
					saleVolume:"22",
					delivery: "快递发货",
					count:1,
					imgIndex:"/static/images/20172001.jpg",
					imgDesc:[{"img": "/static/images/20172001.jpg"},{"img": "/static/images/20172001.jpg"}],
					imgTurn:[{"img": "/static/images/20172001.jpg"},{"img": "/static/images/20172001.jpg"}],
					standards:[
						{"sid": 1,"price": 120, "standard": "100克", "isChoosed": false},
						{"sid": 2,"price": 220, "standard": "120克", "isChoosed": false},
						{"sid": 3,"price": 320, "standard": "150克", "isChoosed": false}
					]
				};
				this.SET_PRODUCT_DETAIL(this.product);
				setTimeout(function(){
	    			$("#product-image-turn").swipeSlide();
	    		},1500);
			},
			chooseStandard(){
				this.showStdWindow = true;
			},
			removeWindow(){
				this.showStdWindow = false;
			}
		}
	}
</script>

<style>
	.space {
		height: 60px;
	}
	/*
	 * 产品页footer样式
	 * */
	.fixed-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	    height: 50px;
		background: #FFFFFF;
		z-index: 99;
	}
	
	.fixed-footer-wrapper {
		width: 100%;
		min-height: 50px;
		border-bottom: 1px solid #CCCCCC;
		border-top: 1px solid #CCCCCC;
	}
	
	.footer-tab-btn1 {
		width: auto;
		height: 50px;
		padding: 5px;
		display: inline-block;
		text-align: center;
		border-right: 1px solid #CCCCCC;
		float: left;
	}
	
	.footer-tab-btn2 {
		width: 28%;
		line-height: 50px;
		background-color: #D9534F;
		display: inline-block;
		float: right;
		text-align: center;
		color: #FFFFFF;
		font-weight: 500;
	}
	
	.footer-tab-btn3 {
		width: 28%;
		line-height: 50px;
		background-color: #F0AD4E;
		display: inline-block;
		float: right;
		text-align: center;
		color: #FFFFFF;
		font-weight: 500;
	}
	
	/*
	 * 产品页面内容样式
	 * */
	.product-container {
		margin-bottom: 50px;
	}
	/*
	 * 布局整体宽度
	 * */
	.product-wrapper {
		width: 100%;
		padding: 0;
	}
	
	/*
	 * 产品轮播图片样式
	 * */
	.product-img-turn {
		width: 100%;
		height: 45%;
		background-color: #FFFFFF;
	}
	
	.product-img-turn img {
		width: 100%;
		height: 45%;
	}
	
	/*
	 * 产品价格样式
	 * */
	.product-price-label {
		width: 100%;
		height:55px;
		background-color: #D9534F;
	}
	
	.product-price-label p {
		width: auto;
		line-height: 55px;
		margin-left: 3%;
		color: #FFFFFF;
		font-size: 20px;
		display: inline-block;
		float: left;
	}
	
	.price-text-small {
		font-size: 20px;
	}
	
	.price-text-large {
		font-size: 26px;
	}
	
	/*
	 * 产品名称样式
	 * */
	.product-name-label {
		width: 100%;
		height: 50px;
		display: inline-block;
		background-color: #FFFFFF;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-name-label p {
		width: auto;
		line-height: 50px;
		font-size: 18px;
		margin-left: 3%;
		float: left;
	}
	
	/*
	 * 产品销售信息样式
	 * */
	.product-sales-volume {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
	}
	
	.product-sales-volume p {
		width: auto;
		line-height: 50px;
		display: inline-block;
		color: #515151;
	}
	
	.product-transport-fare {
		display: inline-block;		
		margin-left: 3%;
		float: left;
	}
	
	.product-sales-fare {
		display: inline-block;
		margin-left: 30%;
		float: left;
	}
	
	/*
	 * 产品规格选择样式
	 * */
	.product-standard {
		width: 100%;
		height: 50px;
		display: inline-block;
		border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
	}
	
	.product-standard p {
		line-height: 50px;
		margin-left: 3%;
		color: #515151;
		display: inline-block;
		float: left;
	}
	
	.product-standard i {
		width: 5%;
		line-height: 50px;
		margin-right: 3%;
		float: right;
	}
	
	/*
	 * 产品详情样式
	 * */
	.product-detail-container {
		width: 100%;
		height: auto;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.product-detail-appraise-title {
		width: 100%;
		height: 45px;
		margin-bottom: 10px;
		text-align: center;
		background-color: #FFFFFF;	
	}
	
	.product-detail-appraise-title p {
		width: auto;
		line-height: 45px;
		text-align: center;
		display: inline-block;
	}
	
	.product-tab-title-bottom-line {
		border-bottom: 2px solid #D9534F;
	}
	
	.product-detail-container ul {
		list-style: none;
		padding: 0;
	}
	
	.product-detail-container img {
		width: 100%;
	}
	
	/*
	 * 产品评价样式
	 * */
	.product-appraise-container {
		width: 100%;
		height: auto;
	}
	
	.product-appraise-user {
		width: auto;
		height: auto;
		padding: 3%;
		margin: 0 2% 0 2%;
	}
	
	.product-appraise-user ul {
		list-style: none;
		padding: 0;
	}
	
	.product-appraise-user ul li {
		list-style: none;
		padding-top: 2%;
		margin-top: 2%;
		border-top: 1px solid #CCCCCC;
	}
	
	.product-appraise-user img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.product-appraise-return {
		width: auto;
		height: auto;
		line-height: 30px;
		padding-left: 5px;
		margin: 0 2% 0 2%;
		background-color: #CCCCCC;
		border-radius: 2px;
	}
	
	.product-appraise-return p {
		width: auto;
		line-height: 30px;
		color: #D43F3A;
		word-break: break-all;
	}
</style>