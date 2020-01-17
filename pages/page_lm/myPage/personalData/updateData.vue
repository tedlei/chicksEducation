<template>
	<view class="ud_app pfAllScreen fx">
		<headPage @topBack="topBack" @topSave="topSave" :title="'修改'+item.title"></headPage>
		<view class="udPage">
			<view class="unInp fx">
				{{item.title}}
				<input type="text" v-model="updateData[item.key]"
				v-if="item.key&&item.key!=='birthday'" focus/>
				<Lyzd class="unDate" v-if="item.key==='birthday'"
				:config="datePickerConfig" @onDateChange="onBirthDayChange"></Lyzd>
				<Wapi class="unDate" v-if="!item.key" @change="change">{{txt}}</Wapi>
			</view>
		</view>
	</view>
</template>

<script>
import headPage from '../../../../components/components_lm/headPage.vue'
import Lyzd from '../../../../components/components_lm/myPage/lyzml-datepicker.vue'
import Wapi from "../../../../components/components_lm/myPage/areaSelection/wangding-pickerAddress.vue"
export default {
	components:{headPage,Lyzd,Wapi},
	data() {
		return {
			item:null,
			user:null,
			updateData:{},
			
			datePickerConfig:{
				initType: "ymd",   //选择日期类型  ymd:年月日   ym:年月
				yearsBefore: 100,    //当前年往前推5年
				yearsAfter: 0,   //当前年往后推0年
				initDate:""    //默认选中日期
			},
			userInfo:null,
			txt: '选择地址',
			
		}
	},
	onLoad(e) {
		let ud = this.updateData;
		let item = JSON.parse(e.itemStr);
		let user = JSON.parse(e.userStr);
		this.userInfo = this.getItemSync('userInfo');
		user.birthday = user['birthday'].split(' ')[0]
		this.item = item
		this.user = user
		ud.phone = user.phone;
		if(item.key) ud[item.key] = user[item.key];
		else{
			if(item.fun==='birthday') {
				ud['birthday'] = user['birthday'];
				this.item.key = 'birthday';
			}else{
				ud.oneDddress = user.oneDddress;
				ud.twoDddress = user.twoDddress;
				ud.threeDddress = user.threeDddress;
				this.txt = (user.oneDddress===user.twoDddress?user.oneDddress:user.oneDddress+user.twoDddress)+user.threeDddress;
			}
		}
	},
	onReady(){
		let key = this.item.key
		if(key==='birthday'){
			let date = this.user[key];
			this.$children[0].$children[1].$children[0].$children[0].initDate(date);
		}
	},
	methods: {
		//返回上一个页面
		topBack(){
			this.pop()
		},
		
		//点击确认时
		topSave(){
			let ui = this.userInfo;
			let {title,key} = this.item;
			let user = this.user;
			let updateData = this.updateData;
			if(key&&user[key]===updateData[key]){
				this.message('请修改'+title+'后在保存')
				return
			}
			if(!key){
				let one = user.oneDddress === updateData.oneDddress
				let two = user.twoDddress === updateData.twoDddress
				let three = user.threeDddress === updateData.threeDddress
			}
			let url = "user/update.do"
			this.fetch({url,data:updateData,method:'post'},2).then(res=>{
				let {message,success} = res[1].data; 
				if(success){
					if(key){
						user[key] = updateData[key];
					}else{
						user.oneDddress = updateData.oneDddress;
						user.twoDddress = updateData.twoDddress;
						user.threeDddress = updateData.threeDddress;
						
					}
					ui.user = user;
					this.setItemSync('userInfo',ui);
					uni.$emit('updateUser')
					uni.$emit('updateHead')
					setTimeout(()=>{
						this.pop();
					},1500)
				}
				this.message(message)
			})
		},
		
		//获取时间后
		onBirthDayChange(e){
			this.updateData.birthday = e.value;
		},
		
		//选择地址时
		change(data) {
			let [a,b,c] = data.data
			this.txt = (a===b?a:a+b)+c;
			let ud = this.updateData;
			ud.oneDddress = a;
			ud.twoDddress = b;
			ud.threeDddress = c;
		}
	}
}
</script>

<style scoped lang="scss">
.ud_app{
	padding-top: 54rpx;
	flex-direction:column;
	.udPage{
		flex: 1;
		background-color: $col-fff;
		.unInp{
			width: 100%;
			height: 128rpx;
			padding-left: 28rpx;
			border-bottom: 2rpx solid $col-main;
			align-items: center;
			font-size: 32rpx;
			color:$col-333;
			input,.unDate{
				margin-left: 22rpx;
				font-size: 28rpx;
			}
		}
	}
}
</style>
