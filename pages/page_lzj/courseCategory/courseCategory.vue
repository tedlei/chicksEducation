<template>
	<view class="courseCategory fx">
		<view class="leftNav">
			<view v-for="(item,index) in courseClassificationList" :key="index" class="leftNavOption">
				<view class="fx fxCenter leftNavOption_tit active" 
					:class="index === showNumber ?  'checked' : ''" 
					@tap="cutShowNumber(index)">{{item.tit}}</view>
				<view v-show="index === showNumber">
					<uCourseCategoryOption  :option="item.option"></uCourseCategoryOption>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import courseCategoryState from './courseCategory.js';
	import uCourseCategoryOption from './courseCategoryOption'
	export default {
		components:{uCourseCategoryOption},
		data() {
			return {...courseCategoryState};
		},
		methods: {
			/**
			 * 切换显示类别
			 */
			cutShowNumber(index){
				this.showNumber = index;
			},
			/**
			 * 获取查询条件
			 */
			getSelectCondition(j, m){
				let {numberArr, contextArr, showNumber, courseClassificationList} = this;
				numberArr = [showNumber, j, m];
				contextArr = [
					courseClassificationList[showNumber].tit,
					courseClassificationList[showNumber].option[j].optionTit,
					courseClassificationList[showNumber].option[j].optionContextList[m]
				];
				
				this.numberArr = numberArr;
				this.contextArr = contextArr;
			}
		},
		onNavigationBarButtonTap({float}) {
			if (float === 'right') {
				let {numberArr, contextArr} = this;
				if (numberArr.length && contextArr.length) {
					uni.$emit('courseCategoryToCurrList', {
						numberArr,
						contextArr
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					}, 220);
				} else {
					uni.showToast({
						title: '未选择筛选条件',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.courseCategory{
		height: 100vh;
		background-color: $col-fff;
		.leftNav{
			width: 188rpx;
			height: 100%;
			background-color: $col-f5;
			.leftNavOption{
				.leftNavOption_tit{
					height: 120rpx;
				}
				.checked{
					position: relative;
					background-color: $col-fff;
				}
				.checked:before{
					position: absolute;
					top: 0;
					left: 0;
					width: 6rpx;
					height: 120rpx;
					content: '';
					background-color: $col-main;
				}
			}
		}
	}
</style>
