<template>
	<div>
		<div class="welcome-page">
			<img src="../../../static/images/about-bg1.jpg" />
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		created() {
			//this.checkAuth();
			this.$router.push("/home");
		},
		methods: {
			...mapMutations([
				"SET_AUTH"
			]),
			checkAuth(){
				var url = window.location.href;
				var str = url.split("?");
				var code = "";
				if(str.length > 1){
					var params = str[1].split("&");
					var p = params[0].split("=");
					code = p[1];
					var auth = {
						"code": code,
						"authrize": false
					}
					this.SET_AUTH(auth);
					this.$router.push("/home");
				}else{
					window.location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx29ffb7f4b6c0a1bb&redirect_uri=http%3A%2F%2Fwww.hzfuyao.com%2FWXVueApp%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
				}
			}
		}
	}
</script>

<style>
	.welcome-page {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
	}
	.welcome-page img {
		width: 100%;
		height: 100%;
	}
</style>