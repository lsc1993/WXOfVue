<template>
	<div>
		<div class="welcome-page">
			<img src="../../../static/images/about-bg1.jpg" />
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			//window.location.href = "localhost:8088/#/home";
			this.$router.push("/home");
			//window.location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx29ffb7f4b6c0a1bb&redirect_uri=http%3A%2F%2Fwww.hzfuyao.com%2FWXVueApp%2Fhome&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
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