<template>
	<div>
		<naviHeader></naviHeader>
		<router-view></router-view>	
	</div>
</template>

<script>
	import naviHeader from '../../components/header/naviHeader'
	export default {
		data () {
			return {
				msg: "hello"
			}
		},
		components: {
			naviHeader
		}
	}
</script>

<style>
</style>