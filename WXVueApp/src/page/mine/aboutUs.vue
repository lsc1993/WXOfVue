<template>
	<div class="about-wrapper">
		<backHeader :title="title"></backHeader>
		<div class="fixed-container">
			<div class="about-container">
				<p class="about-text-indent">给大家介绍一下，这里是老东家的风物馆。谁是老东家呢？
					我也不清楚，只知道他闲云野鹤，游戏人间，神龙见首不见尾。
					目前是我在打理这家小店，我是谁呢？诸位就叫我东家吧！
					在这个小馆子里，希望诸君能够找到自己的风物的，去享受，去敞怀。
					以此，也不枉老东家的厚望！
				</p>
				<p>微信公众号：老东家的风物馆</p>
				<p>客服微信：dongjia993</p>
				<p>联系电话：15700084332&nbsp;&nbsp;17764507160</p>
				<div class="about-store">
					<img  src="/static/images/store.jpg"/>
					<p>关注我们</p>
				</div>
			</div>
		</div>
		<div class="fixed-footer">
			<p>Copyright© 老东家的风物馆官网 2017
				<br/>版权所有浙ICP备17024567号-1
				<br/>技术支持由杭州扶摇网络科技有限公司提供
			</p>
		</div>
	</div>
</template>

<script>
	import backHeader from "../../components/header/backHeader"
	export default {
		data () {
			return {
				title: "关于我们"
			}
		},
		components: {
			backHeader
		}
	}
</script>

<style>
	.about-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: inline-block;
		
	}
	
	.fixed-container {
		position: fixed;
		top: 80px;
		left: 5%;
		bottom: 105px;
		width: 90%;
		height: auto;
		padding: 1%;
		border-radius: 5px;
		box-shadow: 1px 1px 1px 1px #CCCCCC;
		background: rgba(255,255,255, 0.8);
	}
	
	.about-container {
		text-align: left;
	}
	
	.about-text-indent {
		text-indent: 25px;
	}
	
	.about-store {
		position: absolute;
		bottom: 10px;
		width: 80px;
		text-align: center;
	}
	
	.about-container img {
		width: 80px;
		height: 80px;
	}
	
	.fixed-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100px;
		text-align: center;
		background: rgba(0,0,0,0.5);
	}
	.fixed-footer p {
		margin-top: 20px;
	}
</style>