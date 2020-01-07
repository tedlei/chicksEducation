<template>
	<view class="mdc_app">
		<mpl :name='name' :value="value"></mpl>
	</view>
</template>

<script>
	
	import mpl from '../../../components/components_lm/myPage/myPageList.vue'
export default {
	components:{mpl},
	data() {
		return {
			userInfo:null,
		}
	},
	onLoad() {
		this.userInfo = this.getItem('userInfo');
		console.log(this.userInfo)
	},
	methods: {

	}
}
</script>

<style scoped lang="scss">
.mdc_app{
	background: $col-fff;
	
}
</style>
