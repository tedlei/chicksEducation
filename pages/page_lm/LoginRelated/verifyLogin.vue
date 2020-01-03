<template>
	<view class="vlog-app">
		<image v-if="loginpattern==='code'" class="vlImg" src="../../../static/image/logo.png" mode=""></image>
		<TopText v-else title="密码登陆"></TopText>
		<view class="vlViIn fx">
			<text class="vlIntext">{{loginpattern==="code"?"手机号":"账号"}}</text>
			<input 
				class="vlInput " 
				type="text" 
				v-model="phone" 
				:placeholder="'请输入手机号'+(loginpattern==='code'?'码':'或账号')" />
			<!-- focus -->
			<text v-show="phone" class="iconfont" @click="topClear('phone')">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin" v-if="loginpattern==='code'">
			<text class="vlIntext">验证码</text>
			<input class="vlInput" type="number" maxlength="6" v-model="verifyCode" placeholder="请输入验证码"/>
			<view class="vlInYzm" :class="num<=0?'btnBgcolor':''"  @click="topGetVerify()">
				<text>{{num<=0?"获取验证码":"重新获取"+num+"s"}}</text>
			</view>
		</view>
		<view class="vlViIn fx inMagin" v-else>
			<text class="vlIntext">密码</text>
			<input class="vlInput" type="password" v-model="pass" placeholder="请输入密码"/>
			<text v-show="pass" class="iconfont" @click="topClear('pass')">&#xe600;</text>
		</view>
		<view class="vlBtn" :class="islogBtn?'btnBgcolor':''" @click="topLog(islogBtn)">登录</view>
		<view class="vlqh" v-if="loginpattern==='code'" @click="topPassLogin"><text>密码登录</text></view>
		<navigator hover-class="none" class="vlqh" v-else url="">忘记了？找回密码</navigator>
	</view>
</template>

<script>
import '../../../static/css/var.css'
import TopText from '../../../components/components_lm/login/text.vue'
export default {
	components:{TopText},
	data() {
		return {
			phone:'',   //手机号
			verifyCode:'',   //验证码
			pass:'',     //密码
			isAgree:false,   //同意协议
			loginpattern:'code',   //登录模式
			num:0,   //获取验证码时间
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
		
		//点击密码登录
		topPassLogin(){
			this.phone = '';
			this.verifyCode = '';
			this.pass ='';
			this.isAgree = false;
			this.num = 0;
			this.loginpattern = this.loginpattern==="code"?"pass":"code";
		},
		
		//点击登录时
		topLog(boole){
			if(!boole)return
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let lit = this.loginpattern;
			let url = '';
			let data = {phone}
			if(lit==='code'){
				data.vc = vc;
			}else{
				data.pass = pass;
			}
		}
	},
	onNavigationBarButtonTap(e) {
		this.loginpattern='code';
		this.push({url:'/pages/page_lm/LoginRelated/register'})
	},
	
	//点击返回时
	onBackPress(){
		if(this.loginpattern==="pass"){
			this.topPassLogin();
			return true;
		}
		return false;
	},
	computed:{
		islogBtn(){
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let lit = this.loginpattern;
			if(!phone) return false;
			console.log(lit,123)
			if(lit==='code'){
				if(!vc) return false;
			}else{
				if(!pass) return false;
			}
			return true;
		}
	}
}
</script>

<style scoped lang="less">
@import url('../../../static/css/var.css');
.vlog-app{
	.vlImg{
		width: 326rpx;
		height: 118rpx;
		padding: 130rpx 212rpx;
	}
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
	.vlqh{
		width: 750rpx;
		margin-top: 90rpx;
		text-align: center;
		font-size: 18px;
		color:var(--col-333);
		text{
			display: inline-block;
			padding: 20rpx 30rpx;
		}
	}
}
</style>
