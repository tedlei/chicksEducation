<template>
	<view class="mp-app pfAllScreen fx">
		<view class="mpatop">
			<view class="mpaTopText"><text>我的</text></view>
			<view class="mpaTopImg fx">
				<view class="mpaImg fx">
					<image @tap="topUploadHead" 
						:src="userInfo&&userInfo.user.head||'../../../static/image/touxiang.png'"
						></image>
				</view>
				<view class="mpanike">
					<view class="mpaNick">{{userInfo&&userInfo.user.nickName}}</view>
					<view class="mpaNick mpanikeText">
						<text>账户名：{{(userInfo&&userInfo.user.name)||'没有设置帐户名'}}</text>
					</view>
					<view class="mpSignIn active" @tap="clickSign">每日签到</view>
				</view>
			</view>
		</view>
		<view class="mpMain">
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
		
	</view>
</template>

<script>

export default {
	data() {
		return {
			myList:[
				{title:'我的关注',icon:'\ue6af',url:'/pages/page_lm/myPage/focusAndorder/myAttention?type=gz'},
				{title:'我的预约',icon:'\ue622',url:'/pages/page_lm/myPage/focusAndorder/myAttention?type=yy'},
				{title:'个人资料',icon:'\ue621',url:'/pages/page_lm/myPage/personalData/myDataCenter'},
				{title:'卡券',icon:'\ue623',url:'/pages/page_lm/myPage/coupon/couponList'},
				{title:'设置',icon:'\ue620',url:'/pages/page_lm/myPage/settings/setting'},
			],
			userInfo:null, 
		}
	},
	onShow(){   //页面显示
		this.getUsre();
	},
	onLoad() {
		uni.$on('updateHead', this.getUsre);
	},
	methods: {
		//获取用户对象
		getUsre(){
			let userInfo = this.getItemSync('userInfo');
			if(userInfo) this.userInfo = userInfo;
			else this.push({
				url:'/pages/page_lm/LoginRelated/verifyLogin',
				animationType:'slide-in-bottom',
			})
		},
		//跳转到修改头像
		topUploadHead(){
			this.push({url:'/pages/page_lm/myPage/uploadHead'});
		},
		
		//跳转到点击的url
		topViewList(url){
			this.push({url})
		},
		
		//点击每日签到时
		clickSign(){
			this.push({url:'/pages/page_lm/myPage/signIn'})
		}
	}
}
</script>

<style scoped lang="scss">

.mp-app{
	flex-direction: column;
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
				width: 340rpx;
				margin-left: 60rpx;
				padding-top: 40rpx;
				color: $col-fff;
				.mpaNick{
					font-size: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.mpanikeText{
					margin-top:24rpx;
					font-size: 28rpx;
				}
				.mpSignIn{
					width:192rpx;
					height:48rpx;
					margin-top: 48rpx;
					border-radius:24rpx;
					text-align: center;
					line-height: 48rpx;
					background:linear-gradient(179deg,rgba(255,221,162,1) 0%,rgba(255,192,67,1) 100%);
					font-size: 28rpx;
					color:rgba(255,40,32,1);
				}
			}
		}
	}
	.mpMain{
		flex: 1;
		background-color: $col-fff;
		.mpaLi{
			width: 750rpx;
			height: 126rpx;
			align-items: center;
			border-bottom: 2rpx solid #e5e5e5;
		}
	}
	.mpaTop{
		background: #eee;
	}
}
</style>
