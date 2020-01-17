<template>
	<view class="mdc_app">
		<hb title="个人资料"></hb>
		<mpl 
		 v-for="(item,i) of dataList" :key='i' 
		 :item = "item"
		 :user = "userInfo.user"
		 @topUpdate="topUpdate"></mpl>
	</view>
</template>

<script>
import mpl from '../../../../components/components_lm/myPage/myPageList.vue'
import hb from '../../../../components/components_lm/detailPage/headBack.vue'
export default {
	components:{mpl,hb},
	data() {
		return {
			dataList:[
				{title:'手机号',key:'phone',isIcon:true},
				{title:'账户名',key:'name',isIcon:true},
				{title:'昵称',key:'nickName'},
				{title:'生日',key:'',fun:'birthday'},
				{title:'地区',key:'',fun:'region'},
				{title:'详细地址',key:'detailedDddress'},
				{title:'邮箱',key:'email'},
				{title:'QQ',key:'qq'},
			],
			userInfo:null,
		}
	},
	onLoad() {
		this.once('updateUser','getUsre')
		this.getUsre();
	},
	methods: {
		//获取用户对象
		getUsre(){
			this.userInfo = this.getItemSync('userInfo');
		},
		
		//对象序列化
		stringify(obj){
			return JSON.stringify(obj)
		},
		
		//跳转修改
		topUpdate(item,user){
			if(item.isIcon)return
			this.push({url:'/pages/page_lm/myPage/personalData/updateData?itemStr='+this.stringify(item)+'&userStr='+this.stringify(user)})
		}
	}
}
</script>

<style scoped lang="scss">
.mdc_app{
	background: $col-fff;
	
}
</style>
