<template>
	<div>
		<p @click="createAddr()">新建地址</p>
		<p @click="editAddr()">编辑地址</p>
		<addrEditor v-if="showWindow"
			:showDelBtn="showDelBtn"
			:title="title"
			@close="removeWindow()">
		</addrEditor>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import addrEditor from "./addressEditor"
	export default {
		name: "addressManager",
		data () {
			return {
				showWindow: false,
				showDelBtn: false,
				showDialog: false,
				title: "",
				addrTemp: {
					id: "",
					name: "",
					tel: "",
					province: "选择省份",
					city: "选择城市",
					region: "选择地区",
					road: "",
					address: "",
					postcode: ""
				},
				addrItems: []
			}
		},
		components: {
			addrEditor
		},
		methods: {
			...mapMutations([
				'RESET_ADDRTEMP'
			]),
			editAddr(){
				this.title="编辑地址";
				this.showDelBtn = true;
				this.showWindow = true;
			},
			createAddr(){
				this.title="新建地址";
				this.showDelBtn = false;
				this.showWindow = true;
				this.RESET_ADDRTEMP();
			},
			removeWindow(){
				this.showWindow = false;
			},
		}
	}
</script>

<style>
</style>