<template>
	<view class="vlog-app">
		<image class="vlImg" src="../../../static/image/logo.png" mode=""></image>
		<view class="vlViIn fx">
			<text class="vlIntext">手机号</text>
			<input class="vlInput " type="text" v-model="phone" placeholder="请输入手机号码" />
			<!-- focus -->
			<text v-show="phone" class="iconfont" @click="topClear">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">验证码</text>
			<input class="vlInput" type="text" v-model="verifyCode" placeholder="请输入手机号码"/>
			<view class="vlInYzm">
				<text @click="topGetVerify()">获取验证码</text>
			</view>
		</view>
		<view class="vlRa fx">
			<view class="vlRadio" @click="topAgree" :class="isAgree?'bgcolor':''">
				<text v-show="isAgree" class="iconfont">&#xe63e;</text>
			</view>
			<text style="margin-left: 18upx;">我已经阅读并同意</text>
			<navigator class="vlRaNav" url="">服务协议</navigator>
			<text>、</text>
			<navigator class="vlRaNav" url="">隐私保护政策</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone:'',
			verifyCode:'',
			isAgree:false
		}
	},
	methods: {
		//清除手机号
		topClear(){
			this.phone=''
		},
		
		//同意协议
		topAgree(){
			this.isAgree = !this.isAgree;
		},
		
		//获取验证码
		topGetVerify(){
			console.log(this.phone)
		}
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
		.iconfont{
			
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
		margin:20upx auto;
		font-size: 24upx;
		color: #333333;
		align-items: center;
		.vlRadio{
			width: 30upx;
			height: 30upx;
			border:1upx solid rgba(112,112,112,1);
			border-radius: 50%;
			text-align: center;
			line-height: 30upx;
			.iconfont{
				font-size: 30upx;
			}
		}
		.vlRaNav{
			color: #2AB0EA;
		}
		.bgcolor{
			background: #FD5C0E;
			border-color: #FD5C0E;
			color: #fff;
		}
	}
}
</style>
