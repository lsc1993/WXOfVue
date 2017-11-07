<template>
	<div>
		<naviHeader></naviHeader>
		<router-view></router-view>	
		<footerBar></footerBar>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
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
		computed: {
			...mapState([
				"authWX"
			])
		},
		methods: {
			...mapMutations([
				"SET_AUTH"
			]),
			authWXUser(){
				/*if(this.authWX.authrize){
					return;
				}*/
				var authCode = "weixin";
				var self = this;
				if(authCode != "" && authCode != undefined){
					var param = new FormData();
					param.append("code", "weixin");
					requestOnce(requestUrl + "/wxauth/auth", "POST", param, false,
						function(data){
							/*var auth = {
								"code": "",
								"authrize": true
							};
							self.SET_AUTH(auth);*/
							alert(data.message);
						},
						function(){
								
						}
					);
				}
			}
		}
	}
</script>

<style>
</style>