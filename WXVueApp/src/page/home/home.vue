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
		components: {
			naviHeader,
			footerBar
		}
	}
</script>

<style>
</style>