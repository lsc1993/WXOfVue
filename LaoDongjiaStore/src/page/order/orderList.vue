<template>
	<div>
		<div class="order-list-mask" id="order-item">
			<div class="order-item-container">
				<ul>
					<li v-for="(item, index) in orderList" :key="item.id">
						<div class="order-item-no">
							<p class="order-no-text">订单号：{{item.no}}</p>
							<p class="order-status-text">{{item.status}}</p>
						</div>
						<div class="order-desc">
							<div class="order-item-img">
								<img :src="item.imgurl" />
							</div>
							<div class="order-item-name">
								<p>{{item.name}}</p>
								<p>{{item.standard}}</p>
							</div>
							<div class="order-item-cost">
								<p>商品价格</p>
								<p>￥{{item.pTotal}}</p>
							</div>
							<div class="order-item-delivery">
								<p>运费</p>
								<p>￥{{item.deliveryCost}}</p>
							</div>
							<div class="order-item-total-cost">
								<p>合计</p>
								<p>￥{{item.total}}</p>
							</div>
						</div>
						<div class="order-item-operator">
							<button v-if="orderStatus == 'waitSend'" @click="remindOrder(index)">催单</button>
							<button v-if="orderStatus == 'waitReceive'" @click="confirmOrder(index)">确认收货</button>
							<button v-if="(orderStatus == 'complete' || orderStatus == 'cancel')" @click="buyAgain(index)">再次购买</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<dialogTip :show="showDialog" :title="diaTitle" :content="diaContent"
			 @close="removeDialog()" @confirm="removeDialog()"></dialogTip>
	</div>
</template>

<script>
	import dialogTip from "../../components/common/dialog"
	export default {
		data () {
			return {
				drop: null,
				showDialog: false,
				diaTitle: "提示",
				diaContent: "",
				orderList: [
					{
						"id": 1,
						"no": "201708081256000023",
						"pid": "1",
						"name": "绿茶",
						"imgurl": "../../../static/images/s_w453h453.png",
						"standard": "50克",
						"count": 3,
						"pTotal": 300.00,
						"deliveryCost": "0",
						"total": 300,
						"status": "待发货",
						"pstatus": "上架"
					}
				]
			}
		},
		props: {
			orderStatus: {
				type: String,
				default: "waitSend"
			}
		},
		mounted () {
			this.dropUpLoad();
		},
		components: {
			dialogTip
		},
		watch: {
			orderStatus(){
				if(this.orderStatus == "waitSend"){
					
				} else if(this.orderStatus == "waitReceive"){
				
				} else if(this.orderStatus == "complete"){
					
				} else if(this.orderStatus == "cancel"){
					
				}
				if(this.drop != null){
					this.orderList.splice(0, this.orderList.length);
					this.drop.resettabload();
				}
			}
		},
		methods: {
			remindOrder(index){
				this.showDialogWin("已收到您的催单");
			},
			confirmOrder(index){
				
			},
			buyAgain(index){
				this.$router.push("/product/" + this.orderList[index].pid);
			},
			showDialogWin(msg){
				this.diaContent = msg;
				this.showDialog = true;
			},
			removeDialog(){
				this.showDialog = false;
			},
			dropUpLoad(){
				var self = this;
				this.drop = $("#order-item").dropload({
					scrollArea : window,
					domDown : {
			            domClass   : 'dropload-down',
			            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
			            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
			            domNoData  : '<div class="dropload-noData">没有更多了</div>'
			        },
			        loadDownFn: function(me){
			        	var item = {
							"id": 1,
							"no": "201708081256000023",
							"pid": "1",
							"name": "绿茶",
							"imgurl": "../../../static/images/s_w453h453.png",
							"standard": "50克",
							"count": 3,
							"pTotal": 300.00,
							"deliveryCost": "0",
							"total": 300,
							"status": "待发货",
							"pstatus": "上架"
						};
						setTimeout(function(){
							if(self.orderList.length < 10){
								self.orderList.push(item);
								me.resetload();
							}else {
								me.lock();
								me.noData();
								me.resetload();
							}
						}, 1500);
			        	
			        }
				});
			}
		}
	}
</script>

<style>
	.order-list-mask {
		position: relative;
		min-height: 300px;
	}
	
	.order-item-container {
		width: 100%;
		height: auto;
		margin-top: 55px;
		overflow-y: scroll;
	}
	
	.order-item-container ul {
		padding: 0;
	}
	
	.order-item-container ul li {
		width: 100%;
		display: inline-block;
		list-style: none;
		margin-top: 10px;
		box-shadow: 0 0 2px #cccccc;
	}
	
	.order-item-no {
		width: 100%;
		margin-top: 10px;
	}
	
	.order-item-no p {
		display: inline-block;
	}
	
	.order-no-text {
		margin-left: 5%;
		float: left;
		color: #aaaaaa;
	}
	
	.order-status-text {
		margin-right: 5%;
		float: right;
		color: #D40F0F;
	}
	
	.order-desc {
		position: relative;
		width: 100%;
		display: table;
	}
	
	.order-item-img {
		width: 25%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-item-img img {
		width: 90px;
	}
	
	.order-item-name {
		width: 15%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-item-delivery {
		width: 20%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-item-cost {
		width: 20%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-item-total-cost {
		width: 20%;
		display: table-cell;
		vertical-align: middle;
	}
	
	.order-item-operator {
		width: auto;
		float: right;
	}
	
	.order-item-operator button {
		width: 90px;
		height: 30px;
		border: hidden;
		border-radius: 3px;
	}
</style>