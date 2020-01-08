<template>
	<view>
		<uni-nav-bar status-bar="true" backgroundColor="#FD8109" >
			<navigator slot="left" hover-class="none" class="header_position fx fxCenter" 
				:url="'/pages/page_lzj/location/location'">
				<text class="ellipsis">{{getCity()}}</text>
				<text class="iconfont">&#xe771;</text>
			</navigator>
			<navigator hover-class="none" :url="'/pages/page_lzj/search/search'">
				<view class="search">
					<text class="iconfont">&#xe610;</text>
					<input type="text" class="search_input" value="" placeholder="请输入关键字" disabled="true" />
				</view>
			</navigator>
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
			selectCity(){
				
			},
			getCity(){
				let location = this.getStoreGetter('location');
				return location ? location.cityLevel || location.provincialLevel : '重庆';
			}
		}
	}
</script>

<style scoped lang="scss">
	.header_position{
		white-space: nowrap;
		color: $col-fff;
		font-size: $uni-font-size-base;
		& text:nth-child(1){
			display: inline-block;
			width: 84rpx;
		}
	}
	.search{
		position: relative;
		text-indent: 68rpx;
		color: $col-ccc;
		.iconfont{
			position: absolute;
			top: -14rpx;
			left: -20px;
		}
		.search_input{
			width:280px;
			height:28px;
			background-color: $col-fff;
			border-radius: 14px;
		}
	}
</style>
