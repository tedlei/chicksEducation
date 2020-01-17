<template>
	<view class="reg-app pfAllScreen">
		<TopText :title="passType==='reg'?'注册':'找回密码'"></TopText>
		<view class="vlViIn fx">
			<text class="vlIntext">手机号</text>
			<input class="vlInput" focus type="number" maxlength="11" v-model="phone" placeholder='请输入手机号码'/>
			<text v-show="phone" class="iconfont" @tap="topClear('phone')">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">验证码</text>
			<input class="vlInput" type="number" maxlength="6" v-model="verifyCode" placeholder="请输入验证码"/>
			<view class="vlInYzm" :class="num<=0?'btnBgcolor':''"  @tap="topGetVerify()">
				<text>{{num<=0?"获取验证码":"重新获取"+num+"s"}}</text>
			</view>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">密码</text>
			<input class="vlInput" type="password" v-model="pass" placeholder="请输入密码"/>
			<text v-show="pass" class="iconfont" @tap="topClear('pass')">&#xe600;</text>
		</view>
		<view class="vlViIn fx inMagin">
			<text class="vlIntext">确认密码</text>
			<input class="vlInput" type="password" v-model="affirpass" placeholder="请输入确认密码"/>
			<text v-show="affirpass" class="iconfont" @tap="topClear('affirpass')">&#xe600;</text>
		</view>
		<view class="vlRa fx" v-if="passType==='reg'">
			<view class="vlRadio" @tap="topAgree" :class="isAgree?'bgcolor':''">
				<text v-show="isAgree" class="iconfont">&#xe63e;</text>
			</view>
			<text style="margin-left: 18rpx;">我已经阅读并同意</text>
			<navigator hover-class="none" class="vlRaNav" url="">服务协议</navigator>
			<text>、</text>
			<navigator hover-class="none" class="vlRaNav" url="">隐私保护政策</navigator>
		</view>
		<view class="vlBtn" :class="islogBtn?'btnBgcolor':''" @tap="topRes(passType,islogBtn)">
			{{passType==='reg'?'注册':'完成'}}
		</view>
	</view>
</template>

<script>

import TopText from '../../../components/components_lm/login/text.vue'
export default {
	components:{TopText},
	data() {
		return {
			passType:'reg',
			phone:'',  //手机号
			verifyCode:''  ,//验证码
			pass:''  ,//密码
			affirpass:"",   //确认密码
			isAgree:false,  //协议
			num:0   
		}
	},
	onLoad(option) {
		let pt = option.passType;
		if(pt) this.passType = pt;
	},
	methods: {
		//点击清除按钮时
		topClear(str){
			this[str]=''
		},
		//获取验证码
		topGetVerify(){
			let phone = this.phone;
			if(!phone||phone.length<11){
				this.message('电话号码为空或格式不正确')
				this.phone = '';
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
			let url = "message/phone.do";
			let data = {phone}
			this.fetch({url,data},2).then(res=>{
				let {message,success} = res[1].data;
				this.message(message);
				if(!success){
					this.num = 0;
				}
			})
		},
		
		//同意协议
		topAgree(){
			this.isAgree = !this.isAgree;
		},
		
		//点击注册时 
		topRes(boo){
			if(!boo)return
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let ap = this.affirpass;
			if(!vc&&vc.length!==6) {
				this.message('验证码为空或格式不正确');
				return
			}
			if(!pass&&pass.length<6) {
				this.message('密码为空或格式不正确');
				return
			}
			if(!pass&&pass.length<6) {
				this.message('确认密码为空或格式不正确');
				return
			}
			if(pass!==ap) {
				this.message('密码和确切密码不一致');
				this.affirpass = '';
				return
			}
			let url = 'user/save.do';
			let data ={phone,password:pass}
			this.fetch({url,data,method:'post'},2).then(res=>{
				let {message,success} = res[1].data
				this.message(message)
				if(success){
					this.pop();
					// uni.redirectTo({url:'/pages/page_lm/LoginRelated/verifyLogin?loginpattern=pass'})
				}
			})
		}
	},
	computed:{
		islogBtn(){
			let phone = this.phone;
			let vc = this.verifyCode;
			let pass = this.pass;
			let ap = this.affirpass;
			let ia = this.isAgree;
			if(!phone||!vc||!pass||!ap||!ia) return false;
			return true;
		}
	},
	onBackPress() {
		this.hideKey();
	}
}
</script>

<style scoped lang="scss">

.reg-app{
	background-color: $col-fff;
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
			border:1rpx solid $col-999;
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
}
</style>
