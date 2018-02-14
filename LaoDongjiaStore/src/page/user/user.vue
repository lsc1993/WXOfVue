<template>
	<div class="user-wrapper">
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<router-view></router-view>
		<!--<storeFooter></storeFooter>-->
	</div>
</template>

<script>
	import storeHeader from "../../components/header/storeHeader"
	import naviHeader from "../../components/header/naviHeader"
	import storeFooter from "../../components/footer/storeFooter"
	export default {
		data () {
			return {
				msg: ""
			}
		},
		components: {
			storeHeader, naviHeader, storeFooter
		},
	}
</script>

<style>
	.user-wrapper {
		min-height: 100%;
	}
</style>