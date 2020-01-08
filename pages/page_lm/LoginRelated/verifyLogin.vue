<template>
	<view class="vlog-app pfAllScreen fx">
		<headPage @topBack="topBack" @topSave="tzRegPage" title=' ' :login="true"></headPage>
		<view class="vlogBg">
			<image v-if="loginpattern==='code'" class="vlImg" src="../../../static/image/logo.png" mode=""></image>
			<TopText v-else title="密码登陆"></TopText>
			<view class="vlViIn fx">
				<text class="vlIntext">{{loginpattern==="code"?"手机号":"账号"}}</text>
				<input :focus='getFocus'
					class="vlInput " 
					type="text" 
					v-model="phone" 
					:placeholder="'请输入手机号'+(loginpattern==='code'?'码':'或账号')" />
				<!-- focus -->
				<text v-show="phone" class="iconfont" @tap="topClear('phone')">&#xe600;</text>
			</view>
			<view class="vlViIn fx inMagin" v-if="loginpattern==='code'">
				<text class="vlIntext">验证码</text>
				<input class="vlInput" type="number" maxlength="6" v-model="verifyCode" placeholder="请输入验证码"/>
				<view class="vlInYzm" :class="num<=0?'btnBgcolor':''"  @tap="topGetVerify()">
					<text>{{num<=0?"获取验证码":"重新获取"+num+"s"}}</text>
				</view>
			</view>
			<view class="vlViIn fx inMagin" v-else>
				<text class="vlIntext" cursor-spacing = "0">密码</text>
				<input class="vlInput" type="password" v-model="pass" placeholder="请输入密码"/>
				<text v-show="pass" class="iconfont" @tap="topClear('pass')">&#xe600;</text>
			</view>
			<view class="vlBtn" :class="islogBtn?'btnBgcolor':''" @tap="topLog(islogBtn)">登录</view>
			<view class="vlqh" v-if="loginpattern==='code'" @tap="topPassLogin"><text>密码登录</text></view>
			<view class="vlqh" v-else @tap="tzRegPage('pass')">忘记了？找回密码</view>
		</view>
	</view>
</template>

<script>

import TopText from '../../../components/components_lm/login/text.vue'
import headPage from '../../../components/components_lm/headPage.vue'
export default {
	components:{TopText,headPage},
	data() {
		return {
			phone:'',   //手机号
			verifyCode:'',   //验证码
			pass:'',     //密码
			isAgree:false,   //同意协议
			loginpattern:'code',   //登录模式
			num:0,   //获取验证码时间
			getFocus:true,
		}
	},
	onLoad(option){
		let lp = option.loginpattern;
		if(lp) this.loginpattern = lp;
		if(this.getItem('userInfo')){
			this.push({url:'/pages/page_lm/myPage/myPage'})
		}
	},
	methods: {
		//点击清除按钮时
		topClear(str){
			this[str]=''
		},
		
		//获取验证码时间
		topGetVerify(){
			let phone = this.phone;
			if(!phone||phone.length<11){
				this.message('电话号码为空或格式不正确')
				return
			}
			if(this.num<=0){
				this.num = 60;
				this.getVerify(phone);
				let seti = setInterval(()=>{
					this.num --;
					if(this.num<=0){
						clearInterval(seti);
					}
				},1000)
			}
		},
		
		//获取验证码
		getVerify(phone){
			let url = "/message/phone.do";
			let data = {phone}
			this.fetch({url,data},2).then(res=>{
				let {message,success} = res[1].data;
				this.message(message);
				if(!success){
					this.num = 0;
				}
			})
		},
		
		//点击密码登录
		topPassLogin(){
			let aa = this.loginpattern==="code"?"pass":"code";
			this.push({url:'/pages/page_lm/LoginRelated/verifyLogin?loginpattern='+aa})
			// this.phone = '';
			// this.verifyCode = '';
			// this.pass ='';
			// this.isAgree = false;
			// this.num = 0;
			// this.loginpattern = this.loginpattern==="code"?"pass":"code";
			// this.getFocus = true;
		},
		
		//简单加密
		passncrypt(pass){
			let list = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L',
			'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
			'g','h','i','g','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			let item = '';
			for (let i = 0; i < 12; i++) {
				let num1 = parseInt(Math.random()*list.length);
				item += list[num1];
			}
			return item.slice(0,6) + pass + item.slice(6)
		},
		
		//点击登录时
		topLog(boole){
			if(!boole)return
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let lit = this.loginpattern;
			let url = '/login.do';
			let data = {userCode:phone,password:'code'}
			if(lit==='code'){
				data.code = vc;
			}else{
				data.password = this.passncrypt(pass);
			}
			this.fetch({url,data,method:'get'},2).then(res=>{
				let {data,msg,success} = res[1].data;
				this.message(msg);
				if(success){
					this.setItem('userInfo',data);
					this.push({url:'/pages/page_lm/myPage/myPage'})
					// this.push({url:'/pages/index/index'})
				}
			})
		},
		
		//跳转到注册页面
		tzRegPage(str){
			this.hideKey();
			let url = '/pages/page_lm/LoginRelated/register?passType='+str;
			this.push({url})
		},
		
		//点击返回键
		topBack(){
			console.log(134)
			this.pop()
		}
	},
	onNavigationBarButtonTap(e) {
		this.loginpattern='code';
		this.tzRegPage('reg');
	},
	computed:{
		islogBtn(){
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let lit = this.loginpattern;
			if(!phone) return false;
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

<style scoped lang="scss">

.vlog-app{
	padding-top: 54rpx;
	flex-direction:column;
	.vlogBg{
		flex: 1;
		background-color: $col-fff;
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
			color:$col-333;
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
				color:$col-999;
			}
		}
		.btnBgcolor{
			background: $col-main;
			text{
				color: $col-fff;
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
		color: $col-333;
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
			background: $col-main;
			border-color: $col-main;
			color: $col-fff;
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
		color:$col-999;
	}
	.btnBgcolor{
		background: $col-main;
		color: $col-fff;
	}
	.vlqh{
		width: 750rpx;
		margin-top: 90rpx;
		text-align: center;
		font-size: 18px;
		color:$col-333;
		text{
			display: inline-block;
			padding: 20rpx 30rpx;
		}
	}
	}
}
</style>
