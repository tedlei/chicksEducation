<template>
	<view class="rightContent">
		<view v-for="(value, j) in option" :key="j">
			<text class="optionTit">{{value.optionTit}}</text>
			<view class="optionContextList fx">
				<text 
					:class="(n === j + '-' + m) ? 'checked' : ''"
					class="active"
					v-for="(val, m) in value.optionContextList" 
					:key="m" 
					@tap="select(j, m)">{{val}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['option'],
		data(){
			return {
				n: 0
			}
		},
		methods:{
			select(j, m){
				this.n = (j + '-' + m);
				
				this.$parent.getSelectCondition(j, m);
			}
		}
	}
</script>

<style scoped lang="scss">
	.rightContent {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		overflow-y: auto;
		width: 562rpx;
		padding: 6rpx 0 32rpx 60rpx;
		background-color: $col-fff;

		.optionTit {
			display: inline-block;
			margin: 26rpx 0;
			color: $col-main;
			font-size: 32rpx;
			font-weight: bold;
		}

		.optionContextList {
			flex-wrap: wrap;

			text {
				display: inline-block;
				margin-right: 32rpx;
				margin-bottom: 10rpx;
			}
			.checked{
				background-color: #FFEBD8;
				color: $col-main;
			}
		}
	}
</style>
