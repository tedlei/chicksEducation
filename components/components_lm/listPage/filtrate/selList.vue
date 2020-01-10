<template>
	<view class="sl_app">
		<text class="slText">{{item.className}}</text>
		<view class="slView fx">
			<template v-for="(val,t) of item.type">
				<SelView class="slMarLeft" :key="t" @clickSel='clickSel'
				 v-show="val!=='不限'" :val="val" :selNum='item.selNum' :t='t'></SelView>
			</template>
		</view>
	</view>
</template>

<script>
import SelView from './selView.vue'
export default {
	components:{SelView},
	props:['item','i'],
	data() {
		return {
			num:10
		}
	},
	methods: {
		clickSel(t){
			this.item.selNum === t; 
		}
	}
}
</script>

<style scoped lang="scss">
.sl_app{
	width: 100%;
	margin-top: 24rpx;
	.slText{
		margin-left: 30rpx;
		color: $col-333;
	}
	.slView{
		align-items: center;
		flex-wrap: wrap;
		.slMarLeft{
			margin-top: 24rpx;
			margin-left: 30rpx;
		}
	}
}
</style>
