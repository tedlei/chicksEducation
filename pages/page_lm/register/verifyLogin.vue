<template>
	<view class="vlog-app">
		<image class="vlImg" src="../../../static/image/logo.png" mode=""></image>
		<view class="vlViIn fx">
			<text class="vlIntext">手机号</text>
			<input class="vlInput " type="text" :value="phone" placeholder="请输入手机号码" />
			<!-- focus -->
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">验证码</text>
			<input class="vlInput" type="text" :value="phone" placeholder="请输入手机号码"/>
			<view class="vlInYzm">
				<text>获取验证码</text>
			</view>
		</view>
		<view class="vlRa fx">
			<video class="vlRadio"></video>
			<text>我已经阅读并同意</text>
			<navigator url="">服务协议</navigator>
			<text>、</text>
			<navigator url="">隐私保护政策</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone:''
		}
	},
	methods: {

	},
	
	onNavigationBarButtonTap(e) {
	},
}
</script>

<style lang="less">
.vlog-app{
	.vlImg{
		width: 326upx;
		height: 118upx;
		padding: 130upx 212upx;
	}
	.vlViIn{
		width: 630upx;
		height: 92upx;
		margin:auto;
		border-bottom: 2upx solid rgba(229,229,229,1);
		font-size: 36upx;
		line-height: 92upx;
		.vlIntext{
			color:rgba(51,51,51,1);
		}
		.vlInput{
			flex:1;
			height: 100%;
			margin-left: 32upx;
		}
		.vlInYzm{
			width:200upx;
			height:80upx;
			background:rgba(229,229,229,1);
			opacity:1;
			border-radius:5upx;
			text-align: center;
			line-height: 80upx;
			text{
				font-size: 32upx;
				color:rgba(153,153,153,1);
			}
		}
	}
	.inMagin{
		margin-top: 24upx;
	}
	.vlRa{
		width: 630upx;
		margin:10upx auto;
		font-size: 24upx;
		color: #333333;
		.vlRadio{
			width: 30upx;
			height: 30upx;
			border:1upx solid rgba(112,112,112,1);
			border-radius: 50%;
			background: #fff;
		}
	}
}
</style>
