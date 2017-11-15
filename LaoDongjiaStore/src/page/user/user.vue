<template>
	<div>
		<storeHeader></storeHeader>
		<naviHeader></naviHeader>
		<router-view></router-view>
		<storeFooter></storeFooter>
	</div>
</template>

<script>
	import toast from '../../components/common/toast'
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
			storeHeader, naviHeader, storeFooter, toast
		},
	}
</script>

<style>
</style>