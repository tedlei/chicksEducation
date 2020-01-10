<template>
	<view class="dn_app">
		<text>{{isShowData?"正在加载":"没有找到你想要的内容"}}</text>
	</view>
</template>

<script>
export default {
	props:['isShowData'],
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.dn_app{
	padding-top:80px;
	text-align: center;
	color:$col-333;
}
</style>
