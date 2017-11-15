<template>
	<div>
		<div class="order-list-container" id="order-list">
			<!--全部订单-->
			<div class="order-list" id="order-pay-list">
				<ul>
					<li v-for="(order,index) in orderList" :key="order.id">
						<div class="container">
							<div class="row">
								<div class="col-md-5 col-sm-10 col-xs-9">
									<div class="order-no">
										<p>订单编号：{{order.no}}</p>
									</div>
								</div>
								<div class="col-md-1 col-sm-2 col-xs-3">
									<div class="order-status">
										<p>{{order.status}}</p>
									</div>
								</div>
								<div class="order-unsale" v-if="order.pstatus=='下架'">
									<img src="../../../static/images/icon-unsale.png" />
								</div>
								<div class="order-message-container order-message">
									<div class="col-md-2 col-sm-4 col-xs-4">
										<img :src="order.imgurl" />
									</div>
									<div class="col-md-3 col-sm-5 col-xs-5">
										<p class="font-size-medium">{{order.name}}</p>
										<p class="font-size-medium">{{order.standard}}</p>
									</div>
									<div class="col-md-1 col-sm-3 col-xs-3">
										<p class="font-size-medium">{{order.pTotal}}</p>
										<div class="product-count">
											<p class="font-size-medium">{{order.count}}</p>
											<p>X</p>
										</div>
									</div>
								</div>
								<div class="order-total-cost">
									<div class="col-md-6 col-sm-12 col-xs-12 border-bottom-divider">
										<p>合计：{{order.total}}</p>
									</div>
								</div>
								<div class="order-operator">
									<div class="col-md-6 col-sm-12 col-xs-12">
										<button @click="urgeOrder(index)" v-show="urgeBtn">催单</button>
										<button @click="confirmReceive(index)" v-show="receiveBtn">确认收货</button>
										<button @click="buyAgain(index)" v-show="buyBtn">再次购买</button>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<diaTip :showDialog="showTip" :message="msg" :title="title">
			<div slot="dialog-footer">
				<p class="dialog-button-middle" @click="confirm()">确定</p>
			</div>
		</diaTip>
		<toast :show="showToastTip" :message="tip"></toast>
	</div>
</template>

<script>
	import diaTip from '../../components/common/dialog'
	import toast from '../../components/common/toast'
	export default {
		data () {
			return {
				urgeBtn: false,
				receiveBtn: false,
				buyBtn: false,
				start: 0,
				times: 0,
				status: "",
				drop: null,
				showTip: false,
				msg: "",
				title: "提示",
				showToastTip: false,
				tip: "",
				orderList: []
			}
		},
		mounted(){
			this.resetStatus();
			this.dropUpLoad();
		},
		components: {
			diaTip, toast
		},
		watch: {
			'$route'(to, from){
				this.resetStatus();
			}
		},
		methods: {
			initOrderList(data){
				var len = data.result;
				var orders = data.rows;
				for(var i=0;i < len;++i){
					var item = orders[i];
					var order = 
					{
						"id": item.id,
						"no": item.orderId,
						"pid": item.pid,
						"name": item.name,
						"imgurl": imageUrl + item.imgurl,
						"standard": item.standard,
						"count": item.pCount,
						"pTotal": item.pTotal,
						"total": item.total,
						"status": item.status,
						"pstatus": item.pstatus
					};
					var state = this.getStatus(this.status);
					if(state == item.status){
						this.orderList.push(order);
					}
				}
			},
			resetStatus(){
				var param = this.$route.params.pos;
				var status;
				this.start = 0;
				if(param == 0){
					this.status = "WAITSEND";
					this.urgeBtn = true;
					this.receiveBtn = false;
					this.buyBtn = false;
				}else if(param == 1){
					this.status = "WAITRECEIVE";
					this.urgeBtn = false;
					this.receiveBtn = true;
					this.buyBtn = false;
				}else if(param == 2){
					this.status = "COMPLETE";
					this.urgeBtn = false;
					this.receiveBtn = false;
					this.buyBtn = true;
				}else if(param == 3){
					this.status = "CANCEL";
					this.urgeBtn = false;
					this.receiveBtn = false;
					this.buyBtn = true;
				}
				if(this.drop != null){
					this.orderList.splice(0, this.orderList.length);
					this.drop.resettabload();
				}
			},
			getStatus(){
				if(this.status == "WAITSEND"){
					return "待发货";
				}
				if(this.status == "WAITRECEIVE"){
					return "待收货";
				}
				if(this.status == "COMPLETE"){
					return "交易完成";
				}
				if(this.status == "CANCEL"){
					return "已取消";
				}
			},
			dropUpLoad(){
				var times = 0;
				var limit = 10;
				var self = this;
				this.drop = $("#order-list").dropload({
					scrollArea : window,
			        domDown : {
			            domClass   : 'dropload-down',
			            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
			            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
			            domNoData  : '<div class="dropload-noData">没有更多了</div>'
			        },
			        loadDownFn : function(me){
			        	var data = {
							"userToken": $.cookie("user_token"),
							"status": self.status, 
							"start": self.start,
							"limit": limit
						};
			        	requestOnce(requestUrl + "/order/list", "POST", data, true,
							function(data){
								self.start++;
								var len = data.result;
								if(len > 0){
									self.initOrderList(data);
								}else{
									me.lock();
									me.noData();
								}
								me.resetload();
							},
							function(){
								self.times++;
								if(self.times == 5){
									self.showToast("电波迷路了");
									$('.dropload-down').hide();
								}else if(self.times < 5){
									me.resetload(); 
								}
							}
						);
			        }
				});
			},
			urgeOrder(index){
				this.showDialog("已收到您的请求~");
			},
			confirmReceive(index){
				var userToken = $.cookie("user_token");
				var self = this;
				var data = {"userToken": userToken, "id": this.orderList[index].id, "status": "COMPLETE"};
				requestOnce(requestUrl + "/order/receive", "POST", data, true,
					function(data){
						if(data.result == "fault"){
							showDialog(data.message);
						}else{
							self.$router.push("/WXVueApp/receiveSuccess");
						}
					},
					function(){
						
					}
				);
			},
			buyAgain(index){
				if(this.orderList[index].pstatus == "下架"){
					this.showToast("该商品已下架");
					return;
				}
				this.$router.push("/WXVueApp/product/" + this.orderList[index].pid);
			},
			confirm(){
				this.showTip = false;
			},
			showDialog(msg){
				this.showTip = true;
				this.msg = msg;
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
	.order-list {
		width: 100%;
		height: auto;
	}
	
	.order-list ul {
		width: 100%;
		height: auto;
		list-style: none;
		padding: 0;
	}
	
	.order-list ul li {
		width: 100%;
		height: auto;
		display: block; 
		margin-top: 15px;
		box-shadow: 2px 1px #F2F2F2; 
		text-align: left;
	}
	
	.order-no p {
		color: #CCCCCC;
		font-size: 13px;
	}
	
	.order-status p {
		color: #FF0000;
		text-align: right;
		font-size: 15px;
		font-weight: 500;
	}
	
	.order-message-container {
		margin-bottom: 5px;
	}
	
	.order-message img {
		width: 65px;
		height: 65px;
	}
	
	.order-message p {
		height: auto;
		text-align: right;
		display: block;
	}
	
	.order-total-cost p {
		float: right;
	}
	
	.product-count p {
		float: right;
	}
	
	.border-bottom-divider {
		border-bottom: 1px solid #F2F2F2;
	}
	
	.order-operator button {
		margin-left: 3%;
		margin-top: 2%;
		margin-bottom: 3%;
		float: right;
		background-color: rgba(255,255,255,.3);
		border: 1px solid #CCCCCC;
	}
	
	.order-unsale {
		width: auto;
		display: inline;
		z-index: -10;
	}
	
	.order-unsale img {
		position: absolute;
		left: 50%;
		display: inline-block;
		width: auto;
		height: 70px;
		margin-top: 5%;
	}
</style>