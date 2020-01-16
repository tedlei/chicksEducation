<template>
	<view class="ti_app">
		<image :src="image||require('../../../static/image/default.png')" mode=""></image>
	</view>
</template>

<script>
export default {
	props:['image'],
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.ti_app{
	width: 100%;
	image{
		width: 100%;
	}
}
</style>
