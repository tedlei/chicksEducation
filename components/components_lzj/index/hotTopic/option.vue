<template>
	<view class="option fx">
		<image :src="value.courseImage"></image>
		<text class="course_name">{{value.courseName}}</text>
		<text class="course_price">{{'价格：' + value.coursePrice + '元'}}</text>
		
		<!-- 主推等字样 -->
		<text v-if="showCurriclum" class="courseCategory">{{courseCategoryData[value.courseCategory]}}</text>
	</view>
</template>

<script>
	export default{
		// 传入cuClass 为true 则为课程  false为学校 
		// showCurriclum 是否显示主推等字样
        props: ['value', 'showCurriclum'],
        data() {
            return {
                courseCategoryData: ['普通', '主推', '热门']
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
	.option{
		position: relative;
		flex-direction: column;
		width: 336rpx;
		margin-bottom: 20rpx;
		image{
			width: 100%;
			height: 268rpx;
		}
		.course_name{
			overflow: hidden;
			text-overflow: ellipsis;
			color: $col-333;
			font-size:26rpx;
			white-space: nowrap;
		}
		.course_price{
			font-size:26rpx;
			color: #FD4309;
		}
		.courseCategory{
			position: absolute;
			left: 0;
			top: 0;
			width:80rpx;
			height:40rpx;
			background-color: #FD4309;
			color: $col-fff;
			font-size: 24rpx;
			text-align: center;
			line-height: 40rpx;
			border-radius:10rpx 0px 10rpx 0px;
		}
	}
</style>