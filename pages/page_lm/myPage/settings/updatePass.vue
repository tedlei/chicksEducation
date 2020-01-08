<template>
	<view class="up_app fx">
		<headPage @topBack="topBack" @topSave="topSave" title="密码设置"></headPage>
		<view class="upMain">
			<view class="upInp fx" v-for="(item,i) of passInput" :key='i'>
				<text>{{item.title}}</text>
				<input type="password" v-model="passObj[item.name]" :focus="item.focus" />
			</view>
		</view>
	</view>
</template>

<script>
import headPage from '../../../../components/components_lm/headPage.vue'
export default {
	components:{headPage},
	data() {
		return {
			passInput:[
				{title:'旧密码',name:'formerPass',focus:true},
				{title:'新密码',name:'NewPass'},
				{title:'确认密码',name:'affirm'}
			],
			passObj:{
				formerPass:'',   //旧密码
				NewPass:'',   //新密码
				affirm:''    //确认密码
			},
			userInfo:null
		}
	},
	onLoad() {
		this.userInfo = this.getItem('userInfo');
	},
	methods: {
		//返回上一个页面
		topBack(){
			this.pop()
		},
		
		//点击确认时
		topSave(){
			let phone = this.userInfo.user.phone;
			let pass = this.passObj;
			let {formerPass,NewPass,affirm} = pass;
			if(!formerPass||formerPass.length<6||!NewPass||NewPass.length<6||!affirm||affirm.length<6){
				this.message('输入密码为空或格式错误')
				return
			}
			if(formerPass===NewPass){
				this.message('新密码不能和旧密码一致');
				pass.NewPass = '';
				pass.affirm = '';
				return
			}
			if(NewPass!==affirm){
				this.message('新密码和确认密码不一致');
				pass.NewPass = '';
				pass.affirm = '';
				return
			}
			let url = '/user/updatePassword.do'
			let data = {usedpassword:formerPass,password:NewPass,phone}
			this.fetch({url,data,method:'get'},2).then(res=>{
				let {message,success} = res[1].data
				this.message(message);
				if(success){
					setTimeout(()=>{
						this.tzToLogin();
					},1500)
				}
			})
		},
		
		//跳转到登录页
		tzToLogin(){
			try {uni.clearStorageSync()}catch (e){}
			this.fetch({
				url: '/logout.do',
				method: 'get',
				data: {username: phone}
			}, 2).then((res) => {
				uni.reLaunch({url:'/pages/page_lm/LoginRelated/verifyLogin'})
			});
		}
	}
}
</script>

<style scoped lang="scss">
.up_app{
	position: fixed;
	width: 750rpx;
	height: 100%;
	padding-top: 54rpx;
	flex-direction:column;
	.upMain{
		flex: 1;
		background-color: $col-fff;
		.upInp{
			width: 100%;
			height: 128rpx;
			border-bottom: 2rpx solid #e5e5e5;
			align-items: center;
			color: $col-333;
			text{
				margin-left: 28rpx;
				font-size: 32rpx;
			}
			input{
				margin:0 28rpx;
				flex: 1;
			}
		}
	}
}
</style>
