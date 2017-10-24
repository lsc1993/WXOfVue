<template>
	<div>
		<div class="order-list-container" id="order-list">
			<!--全部订单-->
			<div class="order-list" id="order-pay-list">
				<ul>
					<li v-for="(order,index) in loadOrderList" :key="order.id">
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
	</div>
</template>

<script>
	export default {
		data () {
			return {
				urgeBtn: false,
				receiveBtn: false,
				buyBtn: false,
				orderList: []
			}
		},
		computed: {
			loadOrderList(){
				var param = this.$route.params.pos;
				var status;
				if(param == 0){
					status = "NOTSEND";
					this.urgeBtn = true;
					this.receiveBtn = false;
					this.buyBtn = false;
				}else if(param == 1){
					status = "NOTRECEIVE";
					this.urgeBtn = false;
					this.receiveBtn = true;
					this.buyBtn = false;
				}else if(param == 2){
					status = "COMPLETE";
					this.urgeBtn = false;
					this.receiveBtn = false;
					this.buyBtn = true;
				}else if(param == 3){
					status = "CANCEL";
					this.urgeBtn = false;
					this.receiveBtn = false;
					this.buyBtn = true;
				}
				return this.initOrderList(status);
			}
		},
		methods: {
			initOrderList(status){
				this.orderList.splice(0, this.orderList.length);
				var order = 
				{
					"id": "1",
					"no": "1",
					"pid": "1",
					"name": "红茶",
					"imgurl": "/static/images/20172001.jpg",
					"standard": "100克",
					"count": "2",
					"pTotal": "420",
					"total": "420",
					"status": "待发货",
					"pstatus": "上架"
				};
				if(status == "NOTSEND"){
					order.status = "待发货";
				}else if(status == "NOTRECEIVE"){
					order.status = "待收货";
				}else if(status == "COMPLETE"){
					order.status = "已完成";
				}else if(status == "CANCEL"){
					order.status = "已取消";
				}
				this.orderList.push(order);
				return this.orderList;
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
</style>