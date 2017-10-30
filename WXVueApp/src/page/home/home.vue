<template>
	<div>
		<naviHeader></naviHeader>
		<router-view></router-view>	
		<footerBar></footerBar>
	</div>
</template>

<script>
	import naviHeader from '../../components/header/naviHeader'
	import footerBar from '../../components/footer/footer'
	export default {
		data () {
			return {
				msg: "hello"
			}
		},
		created() {
			this.authWXUser();
		},
		components: {
			naviHeader,
			footerBar
		},
		methods: {
			authWXUser(){
				var url = window.location.href;
				var str = url.split("?");
				var code = "";
				if(str.length > 1){
					var params = str[1].split("&");
					var p = params[0].split("=");
					code = p[1]; 
					if(code != "" && code != undefined){
						var param = new FormData();
						param.append("code", code);
						requestOnce("/wxauth/auth", "POST", param, false,
							function(data){
								window.history.pushState(null, null, "/home");
							},
							function(){
								
							}
						);
					}
				}
			}
		}
	}
</script>

<style>
</style>