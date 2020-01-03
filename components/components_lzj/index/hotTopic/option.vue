<template>
	<view class="option fx">
		<image :src="value.courseImage" mode=""></image>
		<text class="course_name">{{'弄i俺倒是你懂阿松大三道啊萨达萨达萨达是'||value.courseName}}</text>
		<text v-if="cuClass" class="course_price">{{'价格：' + value.coursePrice + '元'}}</text>
		<text v-else class="course_price">{{value.subjectNum}}</text>
	</view>
</template>

<script>
	export default{
        props: ['cuClass','value'], // 传入cuClass 为true 则为课程  false为学校
        data() {
            return {
                
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="less">
	@import url('../../../../static/css/var.css');
	.option{
		flex-direction: column;
		width: 336rpx;
		image{
			width: 100%;
			height: 268rpx;
		}
		.course_name{
			overflow: hidden;
			text-overflow: ellipsis;
			color: var(--col-333);
			font-size:26rpx;
			white-space: nowrap;
		}
		.course_price{
			font-size:26rpx;
			color: #FD4309;
		}
	}
</style>