<template>
	<div>
		<backHeader :title="title"></backHeader>
		<div class="my-trade-container container" id="my-buy-order">
			<div class="my-trade-tip" v-show="showTip">
				<h4>空空如也<router-link to="/">去逛逛~</router-link></h4>
			</div>
			<div class="my-trade-content" v-show="!showTip">
				<ul>
					<li v-for="(order, index) in orderList" :key="order.id"
						@click="onItemClick(index)">
						<div class="my-trade-list-img">
							<img :src="order.imgurl"/>
						</div>
						<div class="order-unsale" v-if="order.pstatus=='下架'">
							<img src="../../../static/images/icon-unsale.png" />
						</div>
						<div class="my-trade-list-message">
							<p>{{order.name}}</p>
							<p>￥{{order.price}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<toast :show="showToastTip" :message="tip"></toast>
	</div>
</template>

<script>
	import toast from '../../components/common/toast'
	import backHeader from '../../components/header/backHeader'
	export default {
		data () {
			return {
				title: "我看过的",
				showToastTip: false,
				tip: "",
				orderList: []
			}
		},
		created(){
			this.initOrderList();
		},
		computed: {
			showTip(){
				if(this.orderList.length == 0){
					return true;
				}
				return false;
			}
		},
		components: {
			backHeader,toast
		},
		methods: {
			initOrderList(){
				var self = this;
				var data = {"userToken": $.cookie("user_token")};
				requestOnce("/product/browse-history", "POST", data, true,
					function(data){
						var len = data.size;
						for(var i=0;i < len;++i){
							var order = data.rows[i];
							var item = {
								"id": order.pid,
								"pId": order.pno,
								"name": order.pname,
								"price": order.price,
								"imgurl": imageUrl + order.imgurl,
								"status": order.status
							}
							self.orderList.push(item);
						}
					},
					function(){
						self.showToast("电波无法到达~~");
					}
				);
			},
			onItemClick(index){
				if(this.orderList[index].pstatus == "下架"){
					this.showToast("该商品已下架");
					return;
				}
				this.$router.push("/product/"+this.orderList[index].pId);
			},
			showToast(message){
				var self = this;
				this.tip = message;
				this.showToastTip = true;
				setTimeout(function(){
					self.showToastTip = false;
				},2000);
			}
		}
	}
</script>

<style>
	.my-trade-container {
		width: 100%;
		height: auto;
	}
	
	.my-trade-content {
		width: 100%;
		height: auto;
	}
	
	.my-trade-content ul {
		list-style: none;
		padding: 0;
	}
	
	.my-trade-content ul li {
		width: 100%;
		height: auto;
		display: block;
		margin-top: 8px;
	}
	.my-trade-tip {
		text-align: center;
	}
	
	.my-trade-tip a {
		text-decoration: none;
	}
	
	.my-trade-list-img {
		width: 23%;
		height: auto;
		bottom: 0;
		display: inline-block;
		float: left;
	}

	.my-trade-list-img img {
		width: 75px;
		max-width: 100%;
		height: 75px;
	}
	
	.my-trade-list-message {
		width: 72%;
		height: 80px;
		display: inline-block;
		border-bottom: 1px solid #CCCCCC;
		text-align: right;
	}
	
	.my-trade-list-message p {
		max-width: 90%;
		font-size: 16px;
		word-break: break-all;
		word-wrap: break-word;
	}

	.order-unsale {
		width: auto;
		display: inline;
	}
	
	.order-unsale img {
		position: absolute;
		left: 50%;
		display: inline-block;
		width: auto;
		height: 70px;
		z-index: -100;
	}
</style>