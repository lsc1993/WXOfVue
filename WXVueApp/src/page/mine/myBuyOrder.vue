<template>
	<div>
		<backHeader :title="title"></backHeader>
		<div class="my-trade-container container" id="my-buy-order">
			<div class="my-trade-tip" v-show="showTip">
				<h4>空空如也<router-link to="/WXVueApp/">去逛逛~</router-link></h4>
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
				title: "我买过的",  
				showToastTip: false,
				tip: "",
				start: 0,
				times: 0,
				orderList: []
			}
		},
		mounted(){
			this.dropUpLoad();
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
			dropUpLoad(){
				var self = this;
				
				$("#my-buy-order").dropload({
					scrollArea: window,
			        domDown: {
			            domClass   : 'dropload-down',
			            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
			            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
			            domNoData  : '<div class="dropload-noData">没有更多了</div>'
			        },
			        loadDownFn : function(me){
			        	var data = {"userToken": $.cookie("user_token"), "status": "COMPLETE", "start": self.start, "limit": 10};
			        	requestOnce(requestUrl + "/order/list", "POST", data, true,
							function(data){
								self.start++;
								alert(self.start);
								var len = data.result;
								for(var i=0;i < len;++i){
									var order = data.rows[i];
									var item = {
										"pId": order.pid,
										"name": order.name,
										"price": order.pTotal,
										"imgurl": imageUrl + order.imgurl,
										"pstatus": order.pstatus
									};
									self.orderList.push(item);
								}
								if(len <= 0){
									me.lock();
									me.noData();
								}
								me.resetload();
							},
							function(){
								self.times++;
								if(self.times == 5){
									self.showToast("电波迷路了~~");
									$('.dropload-down').hide();
								} else if(self.times < 5){
									me.resetload(); 
								}
							}
						);
			        }
		     	});
			},
			onItemClick(index){
				if(this.orderList[index].pstatus == "下架"){
					this.showToast("该商品已下架");
					return;
				}
				this.$router.push("/WXVueApp/product/"+this.orderList[index].pId);
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
		position: absolute;
 		top: 60px;
 		left: 0;
 		right: 0;
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
		margin-top: 10px;
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
		left: 45%;
		display: inline-block;
		width: auto;
		height: 70px;
		z-index: -100;
	}
</style>