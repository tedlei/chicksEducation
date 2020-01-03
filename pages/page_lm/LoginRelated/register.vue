<template>
	<view class="reg-app">
		<TopText title="注册"></TopText>
		<view class="vlViIn fx">
			<text class="vlIntext">手机号</text>
			<input class="vlInput " type="text" v-model="phone" placeholder='请输入手机号码'/>
			<!-- focus -->
			<text v-show="phone" class="iconfont" @click="topClear('phone')">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">验证码</text>
			<input class="vlInput" type="number" maxlength="6" v-model="verifyCode" placeholder="请输入验证码"/>
			<view class="vlInYzm" :class="num<=0?'btnBgcolor':''"  @click="topGetVerify()">
				<text>{{num<=0?"获取验证码":"重新获取"+num+"s"}}</text>
			</view>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">密码</text>
			<input class="vlInput" type="password" v-model="pass" placeholder="请输入密码"/>
			<text v-show="pass" class="iconfont" @click="topClear('pass')">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">确认密码</text>
			<input class="vlInput" type="password" v-model="affirmass" placeholder="请输入确认密码"/>
			<text v-show="affirmass" class="iconfont" @click="topClear('affirmass')">&#xe600;</text>
		</view>
		<view class="vlRa fx">
			<view class="vlRadio" @click="topAgree" :class="isAgree?'bgcolor':''">
				<text v-show="isAgree" class="iconfont">&#xe63e;</text>
			</view>
			<text style="margin-left: 18rpx;">我已经阅读并同意</text>
			<navigator hover-class="none" class="vlRaNav" url="">服务协议</navigator>
			<text>、</text>
			<navigator hover-class="none" class="vlRaNav" url="">隐私保护政策</navigator>
		</view>
		<view class="vlBtn" :class="false?'btnBgcolor':''">注册</view>
	</view>
</template>

<script>
import TopText from '../../../components/components_lm/login/text.vue'
export default {
	components:{TopText},
	data() {
		return {
			phone:'',  //手机号
			verifyCode:''  ,//验证码
			pass:''  ,//密码
			affirmass:"",   //确认密码
			isAgree:false,  //协议
			num:0   
		}
	},
	methods: {
		//点击清除按钮时
		topClear(str){
			this[str]=''
		},
		//获取验证码
		topGetVerify(){
			if(this.num<=0){
				this.num = 60;
				let seti = setInterval(()=>{
					this.num --;
					if(this.num<=0){
						clearInterval(seti);
					}
				},1000)
			}
		},
		//同意协议
		topAgree(){
			this.isAgree = !this.isAgree;
		}
		
		
	}
}
</script>

<style scoped lang="less">
.reg-app{
	.vlViIn{
		width: 630rpx;
		height: 92rpx;
		margin:auto;
		border-bottom: 2rpx solid rgba(229,229,229,1);
		font-size: 36rpx;
		line-height: 92rpx;
		.vlIntext{
			color:rgba(51,51,51,1);
		}
		.vlInput{
			flex:1;
			height: 100%;
			margin-left: 32rpx;
		}
		.vlInYzm{
			width:200rpx;
			height:80rpx;
			background:rgba(229,229,229,1);
			opacity:1;
			border-radius:10rpx;
			text-align: center;
			line-height: 80rpx;
			text{
				font-size: 32rpx;
				color:rgba(153,153,153,1);
			}
		}
		.btnBgcolor{
			background: var(--colMain);
			text{
				color: var(--col-fff);
			}
		}
	}
	.inMagin{
		margin-top: 24rpx;
	}
	.vlRa{
		width: 630rpx;
		margin:20rpx auto;
		font-size: 24rpx;
		color: #333333;
		align-items: center;
		.vlRadio{
			width: 30rpx;
			height: 30rpx;
			border:1rpx solid rgba(112,112,112,1);
			border-radius: 50%;
			text-align: center;
			line-height: 30rpx;
			.iconfont{
				font-size: 30rpx;
				width: 20px;
			}
		}
		.vlRaNav{
			color: #2AB0EA;
		}
		.bgcolor{
			background: var(--colMain);
			border-color: var(--colMain);
			color: var(--col-fff);
		}
	}
	.vlBtn{
		width:630rpx;
		height:80rpx;
		margin:72rpx auto;
		background:rgba(229,229,229,1);
		border-radius:10rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 36rpx;
		color:var(--col-999);
	}
	.btnBgcolor{
		background: var(--colMain);
		color: var(--col-fff);
	}
}
</style>
