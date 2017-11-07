<template>
	<div id="product-wrapper" class="product-container">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<ul class="product-ul">
						<li v-for="(product, index) in products" :key="product.id" @click="gotoProduct(index)">
							<img :src="product.img" />
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
				start: 0,
				times: 0,
				products:[]
			}
		},
		created() {
		},
		mounted(){
			this.dropUpLoad();
		},
		methods: {
			gotoProduct(index){
				var pId = this.products[index].pId;
				this.$router.push("/WXVueApp/product/"+pId);
			},
			dropUpLoad(){
				var self = this;
				$("#product-wrapper").dropload({
					scrollArea : window,
			        domDown : {
			            domClass   : 'dropload-down',
			            domRefresh : '<div class="dropload-refresh">上拉加载更多</div>',
			            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
			            domNoData  : '<div class="dropload-noData">没有更多了</div>'
			        },
			        loadDownFn: function(me){
			        	requestOnce(requestUrl + "/product/list", "POST", {"start": self.start, "limit": 5}, true,
							function(data){
								self.start++;
								var len = data.size;
								if(len > 0){
									for(var i=0;i < len;++i){
										var pro = {
											"id": data.rows[i].product.id,
											"pId": data.rows[i].product.pId,
											"img": imageUrl + data.rows[i].image.image
										};
										self.products.push(pro);
									}
								}else{
									me.lock();
									me.noData();
								}
								me.resetload();
							},
							function(){
								self.times++;
								if(self.times == 5){
									alert("我们与服务器失去了连接");
									$('.dropload-down').hide();
								} else if(self.times < 5){
									me.resetload(); 
								}
							})
			        }
				});
			}
		},
		watch: {
			//监听路由参数变化
			'$route'(to, from){
				if(this.$route.params.id == 1){
					//do something
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