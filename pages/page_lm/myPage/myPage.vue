<template>
	<view class="mp-app">
		<view class="mpatop">
			<view class="mpaTopText"><text>我的</text></view>
			<view class="mpaTopImg fx">
				<view class="mpaImg fx">
					<image @tap="topUploadHead" 
						:src="userInfo&&userInfo.user.head||'../../../static/image/touxiang.png'"
						></image>
				</view>
				<view class="mpanike">
					<text>像风一样自由飞翔</text>
					<view class="mpanikeText"><text>账户名：15823961672</text></view>
				</view>
			</view>
		</view>
		<view class="mpaLi fx" v-for="(item,i) of myList" 
			:key='i' 
			hover-class="mpaTop" 
			@tap="topViewList(item.url)">
			<view style="width: 260rpx;">
				<text style="margin-left: 40rpx;" class="iconfont">{{item.icon}}</text>
				<text style="margin-left: 30rpx;">{{item.title}}</text>
			</view>
			<text style="margin-left: 430rpx;" class="iconfont">&#xe601;</text>
		</view>
		
	</view>
</template>

<script>

export default {
	data() {
		return {
			myList:[
				{title:'我的关注',icon:'\ue6af',url:'/pages/page_lm/myPage/myAttention?type=gz'},
				{title:'我的预约',icon:'\ue622',url:'/pages/page_lm/myPage/myAttention?type=yy'},
				{title:'个人资料',icon:'\ue621',url:'/pages/page_lm/myPage/myDataCenter'},
				{title:'卡券',icon:'\ue623',url:''},
				{title:'设置',icon:'\ue620',url:''},
			],
			userInfo:null, 
		}
	},
	onLoad() {
		this.userInfo = this.getItemSync('userInfo');
	},
	methods: {
		//跳转到修改头像
		topUploadHead(){
			this.push({url:'/pages/page_lm/myPage/uploadHead'});
		},
		
		//跳转到点击的url
		topViewList(url){
			this.push({url})
		}
	}
}
</script>

<style scoped lang="scss">

.mp-app{
	.mpatop{
		width: 750rpx;
		height: 440rpx;
		padding-top: 50rpx;
		background: $col-main;
		position: relative;
		.mpaTopText{
			font-size: 36rpx;
			text-align: center;
			color: $col-fff;
		}
		.mpaTopImg{
			width: 750rpx;
			height: 280rpx;
			position: absolute;
			bottom: 4rpx;
			.mpaImg{
				width: 290rpx;
				height: 280rpx;
				margin-left: 30rpx;
				background-image: url(../../../static/image/headBgImg.png);
				background-size: 100% 100%;
				// justify-content: center;
				align-items: center;
				image{
					width: 240rpx;
					height: 240rpx;
					border-radius: 50%;
					margin-left: 15rpx;
				}
			}
			.mpanike{
				margin-left: 60rpx;
				padding-top: 66rpx;
				font-size: 40rpx;
				color: $col-fff;
				.mpanikeText{
					margin-top:32rpx;
					font-size: 28rpx;
				}
			}
		}
	}
	.mpaLi{
		width: 750rpx;
		height: 126rpx;
		align-items: center;
		border-bottom: 2rpx solid #e5e5e5;
	}
	.mpaTop{
		background: #eee;
	}
}
</style>
