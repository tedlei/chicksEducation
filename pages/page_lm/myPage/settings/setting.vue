<template>
	<view class="sett_app">
		<mpl
		 v-for="(item,i) of dataList" :key='i' 
		 :item = "item"
		 @topUpdate='topUpdate'
		 ></mpl>
	</view>
</template>

<script>
import mpl from '../../../../components/components_lm/myPage/myPageList.vue'
export default {
	components:{mpl},
	data() {
		return {
			dataList:[
				{title:'密码设置',type:'updatepassword'},
				{title:'退出登录',isIcon:true,type:'logout'}
			],
			userInfo:null
		}
	},
	onLoad() {
		this.userInfo = this.getItem('userInfo');
	},
	methods: {
		//点击选项时
		topUpdate(item){
			let type = item.type;
			if(type==='updatepassword'){
				this.push({url:'/pages/page_lm/myPage/settings/updatePass'})
			}else{
				this.logOut()
			}
		},
		
		//点击退出登录时
		logOut(){
			let phone = this.userInfo.user.phone;
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
.sett_app{
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: $col-fff;
}
</style>
