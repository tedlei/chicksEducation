<template>
	<view class="search">
		<ul class="ul fx">
			<li class="li active" @tap="updateNum(0)">课程</li>
			<li class="li active" @tap="updateNum(1)">学校</li>
			<li class="li active" @tap="updateNum(2)">名师</li>
			<li class="li active" @tap="updateNum(3)">资讯</li>
			<li class="bottom_line" :style="{
				left: (90 + (142.5*num)) + 'rpx'
			}"></li>
		</ul>
		<view class="search_main">
			<view class="history fx">
				<text>历史搜索</text>
				<text class="iconfont delete">&#xe732;</text>
			</view>
			<view class="context fx">
				<text class="active" v-for="(item,index) in historyKeyword" :key="index" @click="getHistoryContext(item)">
					{{item}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				historyKeyword: []
			};
		},
		onLoad() {
			this.getItem('historyKeyword', (data)=>{
				this.historyKeyword = data || [];
			});
		},
		methods: {
			updateNum(num) {
				this.num = num;
			},
			getHistoryContext(input){
				uni.$emit('sendSearchInput', input)
			}
		}
	}
</script>

<style scoped lang="scss">
	.search{
		.ul{
			position: relative;
			justify-content: space-around;
			padding: 16rpx 90rpx;
			border-bottom: 1px solid $col-e5;
			.bottom_line{
				position: absolute;
				bottom: 0;
				width:60px;
				height:2px;
				background-color: $col-main;
				border-radius:1px;
				transition: left 0.5s;
			}
		}
		.search_main{
			padding: 22rpx 30rpx 0;
			color: $col-333;
			.history{
				justify-content: space-between;
				& text:nth-child(2){
					font-size: 38rpx;
				}
			}
			.context{
				flex-wrap: wrap;
				text{
					display: inline-block;
					padding: 10rpx 18rpx;
					margin-top: 22rpx;
					margin-right: 30rpx;
					background-color: $col-fff;
					font-size: $uni-font-size-base;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
