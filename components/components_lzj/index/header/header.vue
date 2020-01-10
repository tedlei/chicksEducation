<template>
	<view>
		<view class="header2"></view>
		<view class="header">
			<view class="fx header_main">
				<navigator slot="left" hover-class="none" class="header_position fx fxCenter" 
					:url="'/pages/page_lzj/location/location'">
					<text class="ellipsis">{{getCity()}}</text>
					<text class="iconfont">&#xe771;</text>
				</navigator>
				<navigator hover-class="none" :url="'/pages/page_lzj/search/search'" class="search_content">
					<view class="search">
						<text class="iconfont">&#xe610;</text>
						<view class="search_input">请输入关键字</view>
					</view>
				</navigator>
			</view>
		</view>
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
	.header2{
		height: 68px;
		width: 100vw;
	}
	.header{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100vw;
		padding-top: 20px;
		background-color: #FD8109;
		.header_main{
			align-items: center;
			height: 48px;
			padding: 0 30rpx 0 16rpx;
			.header_position{
				margin-right: 16rpx;
				white-space: nowrap;
				color: $col-fff;
				font-size: $uni-font-size-base;
				& text:nth-child(1){
					display: inline-block;
					width: 84rpx;
					text-align: center;
				}
			}
			.search_content{
				flex: 1;
				.search{
					position: relative;
					text-indent: 68rpx;
					color: $col-ccc;
					.iconfont{
						position: absolute;
						left: -40rpx;
						top: 50%;
						transform: translateY(-50%);
					}
					.search_input{
						height:28px;
						line-height: 28px;
						background-color: $col-fff;
						border-radius: 14px;
					}
				}
			}
		}
	}
</style>
