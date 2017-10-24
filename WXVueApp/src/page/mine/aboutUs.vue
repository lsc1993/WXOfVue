<template>
	<div>
		<backHeader :title="title"></backHeader>
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
</style>