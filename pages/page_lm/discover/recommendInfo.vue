<template>
	<view class="rein_app pfAllScreen fx">
		<HeaderView></HeaderView>
	</view>
</template>

<script>
	import HeaderView from '../../../components/components_lzj/index/header/header.vue'
export default {
	components:{HeaderView},
	data() {
		return {
		}
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.rein_app{
	flex-direction: column;
}
</style>
