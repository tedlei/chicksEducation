<template>
	<view class="si_app fx pfAllScreen">
		<hb title="每日签到" :bgInherit='true'></hb>
		<!-- <scroll-view scroll-y="true" style="flex: 1; overflow: hidden;padding-bottom: 20rpx;"> -->
			<view class="si_integral">
				<view class="si_int_top">
					我的积分
					<text class="si_int_num">100</text>
				</view>
				<view class="si_remind fx">
					<view class="si_rem_left">本周你已连续签到1天</view>
					<view class="si_rem_right fx">
						<text>签到提醒</text>
						<switch style="transform:scale(0.6)" :checked="false" @change="switch1Change" />
					</view>
				</view>
				<view class="si_img_fx fx">
					<template v-for="(item,i) of sinList">
						<siginList :key='i' :item="item" :isContinuous="continuousSky>=(i+1)"
						:isEnd="i===(sinList.length-1)"></siginList>
					</template>
				</view>
				<view class="si_hint fx">
					<image :src="require('../../../static/image/sign/signImg1.png')" mode=""></image>
					<text>连续登录30天送10元无门槛、可叠加优惠券</text>
				</view>
			</view>
			<view class="si_integral si_height">
				<view class="si_bot_top fx">
					<view class="si_bot_left">做任务 领积分</view>
					<text class="si_bot_right">今日已得5积分</text>
				</view>
				<task v-for="(obj,t) of taskList" :key='t' :obj="obj"></task>
			</view>
		<!-- </scroll-view> -->
	</view>
</template>

<script>
import hb from '../../../components/components_lm/detailPage/headBack.vue'
import siginList from '../../../components/components_lm/myPage/sign/signinList.vue'
import task from '../../../components/components_lm/myPage/sign/task.vue'
export default {
	components:{hb,siginList,task},
	data() {
		return {
			sinList:[
				{sky:'第1天',integral:5},
				{sky:'第2天',integral:5},
				{sky:'第3天',integral:5},
				{sky:'第4天',integral:5},
				{sky:'第5天',integral:5},
				{sky:'第6天',integral:5},
				{sky:'第7天',integral:5}
			],
			continuousSky:0, //周连续签到天数
			taskList:[
				{title:'每日签到',integral:5,isFinish:false},
				{title:'每日关注',integral:2,isFinish:false,url:'/pages/index/index'},
				{title:'每日预约',integral:2,isFinish:false,url:'/pages/index/index'},
			],
		}
	},
	methods: {
		//开关连续签到
		switch1Change(e){
			console.log(e.detail.value);
		},
	}
}
</script>

<style scoped lang="scss">
.si_app{
	flex-direction: column;
	background-image: url('~@/static/image/sign/signIn.png');
	background-size: 100% 100%;
	.si_integral{
		width: 718rpx;
		height: 626rpx;
		margin:38rpx auto;
		margin-bottom: 0;
		background-color: $col-fff;
		border-radius: 5px;
		.si_int_top{
			height: 100rpx;
			padding-top: 26rpx;
			padding-left:  28rpx;
			border-bottom: 1px solid $col-f5;
			font-size: 36rpx;
			font-weight: bold;
			color: $col-333;
			.si_int_num{
				margin-left: 20rpx;
				color: $col-main;
			}
		}
		.si_remind{
			padding:0 30rpx;
			padding-top: 22rpx;
			align-items: center;
			justify-content: space-between;
			.si_rem_left{
				padding-left: 5px;
				border-left: 2px solid $col-main;
				font-weight: bold;
			}
			.si_rem_right{
				align-items: center;
			}
		}
		.si_img_fx{
			flex-wrap: wrap;
		}
		.si_hint{
			margin-top: 40rpx;
			justify-content: center;
			align-items: center;
			image{
				width: 48rpx;
				height: 52rpx;
			}
			text{
				margin-left: 10rpx;
				font-size: 28rpx;
				color:$col-main;
			}
		}
	}
	.si_height{
		height: 496rpx;
		margin-top: 16rpx;
		.si_bot_top{
			padding:24rpx 30rpx;
			justify-content: space-between;
			align-items: center;
			.si_bot_left{
				padding-left: 10px;
				border-left: 2px solid $col-main;
				font-weight: bold;
				color: $col-333;
			}
			.si_bot_right{
				font-size: 24rpx;
				color:#FD5D0A;
			}
		}
	}
}
</style>
