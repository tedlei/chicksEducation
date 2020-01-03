<template>
	<view>
		<uni-nav-bar status-bar="true" backgroundColor="#FD8109" >
			<view slot="left" class="header_position">
				<text>重庆</text>
				<text class="iconfont">&#xe771;</text>
			</view>
			<view class="search" @tap="search">
				<text class="iconfont">&#xe610;</text>
				<input type="text" class="search_input" value="" placeholder="请输入关键字" disabled="true" />
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		onLoad() {
			
		},
		methods:{
			search(){
				this.push({url: '/pages/page_lzj/search/search'});
			}
		}
	}
</script>

<style scoped lang="less">
	.header_position{
		white-space: nowrap;
		margin: 0 20rpx;
		color: #FFFFFF;
	}
	.search{
		position: relative;
		text-indent: 68rpx;
		color: #ccc;
		.iconfont{
			position: absolute;
			top: -14rpx;
			left: -20px;
		}
		.search_input{
			width:280px;
			height:28px;
			background:#fff;
			border-radius: 14px;
		}
	}
	view{
		box-sizing: border-box;
	}
</style>
