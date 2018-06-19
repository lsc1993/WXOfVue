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
			<div class="order-page-container">
				<div class="order-page-button-list">
					<button class="order-page-orient-button" @click="selectPage(0)"><img src="../../../static/images/icon-left-white.png"></button>
					<ul>
						<li v-for="item in pageList" :key="item.id">
							<button @click="selectPage(item)">{{item}}</button>
						</li>
					</ul>
					<button class="order-page-orient-button" @click="selectPage(-1)"><img src="../../../static/images/icon-right-white.png"></button>
					<div class="order-page-overview">
						<p>第{{currentSelectedPage}}页</p>
						<p>共{{this.pageCount}}页</p>
					</div>
				</div>
			</div>
		</div>	
		<toast :show="showToastTip" :message="tip"></toast>
		<dialogTip :show="showDialog" :title="diaTitle" :content="diaContent"
			@close="removeDialog()" @confirm="removeDialog()"></dialogTip>
	</div>
</template>

<script>
	import dialogTip from "../../components/common/dialog"
	import toast from "../../components/common/toast"
	export default {
		data () {
			return {
				drop: null,
				tip: "",
				showDialog: false,
				showToastTip: false,
				diaTitle: "提示",
				diaContent: "",
				pageCount: 10,
				currentPage: 1,
				pageList: [1, 2, 3, 4, 5],
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
		components: {
			dialogTip, toast
		},
		computed: {
			currentSelectedPage() {
				return this.currentPage;
			}
		},
		watch: {
			orderStatus(){
				if(this.orderStatus == "waitSend"){
					
				} else if(this.orderStatus == "waitReceive"){
				
				} else if(this.orderStatus == "complete"){
					
				} else if(this.orderStatus == "cancel"){
					
				}
			}
		},
		methods: {
			remindOrder(index) {
				this.showDialogWin("已收到您的催单");
			},
			confirmOrder(index) {
				
			},
			buyAgain(index){
				this.$router.push("/product/" + this.orderList[index].pid);
			},
			showDialogWin(msg) {
				this.diaContent = msg;
				this.showDialog = true;
			},
			removeDialog(){
				this.showDialog = false;
			},
			selectPage(pos) {
				if (pos == 0 && this.currentPage == 1) {
					this.showToast("已经是第一页了");
					return;
				}
				if (pos == -1 && this.currentPage == this.pageCount) {
					this.showToast("已经是最后一页了");
					return;
				}
				if (pos == this.currentPage) {
					return;
				}
				var pagePos;
				//向左选择页面
				if (pos == 0) {
					if (this.currentPage == this.pageList[0] && this.currentPage > 1){
						for (var i = 0;i < this.pageList.length; ++i) {
							this.pageList[i]--;
						}
						this.currentPage--;
					} else {
						this.currentPage--;
					}
					return;
				}
				//向右选择页面
				if (pos == -1) {
					if (this.currentPage == this.pageList[4] && this.currentPage < this.pageCount){
						for (var i = 0;i < this.pageList.length; ++i) {
							this.pageList[i]++;
						}
						this.currentPage++;
					} else {
						this.currentPage++;
					}
					return;
				}
				this.currentPage = pos;
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
		width: 98%;
		display: inline-block;
		list-style: none;
		margin: 20px auto;
		padding: 5px;
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
		background: #d40f0f;
		border: hidden;
		border-radius: 3px;
		color: #ffffff;
	}
	
	.order-page-container {
		width: 100%;
	}
	
	.order-page-button-list {
		width: auto;
		margin: 0 auto;
	}
	
	.order-page-button-list ul {
		padding: 0;
		display: inline-block;
	}
	
	.order-page-button-list ul li {
		width: auto;
		display: inline-block;
		margin-left: 5px;
		margin-right: 5px;
	}
	
	.order-page-list-button-select {
		width: 30px;
		height: 30px;
		background: #a52a2a;
		border: hidden;
		color: #ffffff;
		outline: none;
	}
	
	.order-page-button-list button {
		width: 30px;
		height: 30px;
		background: #d40f0f;
		border: hidden;
		color: #ffffff;
		outline: none;
	}

	
	.order-page-button-list button:hover {
		cursor: pointer;
		background: #a52a2a;
	}

	.order-page-button-list button img {
		width: 100%;
	}

	.order-page-orient-button {
		display: inline-block;
	}
	
	.order-page-overview {
		display: inline-block;
	}
	
	.order-page-overview p {
		display: inline-block;
	}
</style>