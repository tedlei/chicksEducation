<template>
<<<<<<< HEAD
	<view class="sl_app">
		<text class="slText">{{selList.className}}</text>
		<view class="slView fx">
			<template v-for="(val,t) of selList.type">
				<SelView class="slMarLeft" :key="t" @clickSel="clickSel"
				 v-if="val!=='不限'" :val="val" :selNum='selList.selNum' :t='t'></SelView>
			</template>
=======
	<view class="sl_app">
		<text class="slText">{{selList.className}}</text>
		<view class="slView fx">
			<template v-for="(val,t) of selList.type">
				<SelView class="slMarLeft" :key="t" @clickSel="clickSel"
				 v-if="val!=='不限'" :val="val" :selNum='selList.selNum' :t='t'></SelView>
			</template>
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		</view>
	</view>
</template>

<<<<<<< HEAD
<script>
import SelView from './selView.vue'
export default {
	components:{SelView},
	props:['item','i'],
	data() {
		return {
			selList:{},
		}
	},
	created() {
		this.selList = this.item;
	},
	methods: {
		clickSel(t,val){
			let num = 0 ;
			if(t!==this.selList.selNum) num = t;
			this.selList.selNum = num; 
			this.$emit('clickSel',this.i,num,val);
=======
<script>
import SelView from './selView.vue'
export default {
	components:{SelView},
	props:['item','i'],
	data() {
		return {
			selList:{},
		}
	},
	created() {
		this.selList = this.item;
	},
	methods: {
		clickSel(t,val){
			let num = 0 ;
			if(t!==this.selList.selNum) num = t;
			this.selList.selNum = num; 
			this.$emit('clickSel',this.i,num,val);
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
		}
	}
}
</script>

<<<<<<< HEAD
<style scoped lang="scss">
.sl_app{
	width: 100%;
	margin-top: 24rpx;
	.slText{
		margin-left: 30rpx;
		color: $col-333;
	}
	.slView{
		align-items: center;
		flex-wrap: wrap;
		.slMarLeft{
			margin-top: 24rpx;
			margin-left: 30rpx;
		}
	}
=======
<style scoped lang="scss">
.sl_app{
	width: 100%;
	margin-top: 24rpx;
	.slText{
		margin-left: 30rpx;
		color: $col-333;
	}
	.slView{
		align-items: center;
		flex-wrap: wrap;
		.slMarLeft{
			margin-top: 24rpx;
			margin-left: 30rpx;
		}
	}
>>>>>>> 2de0f37acc56a0973e9542f1f203a67643853d80
}
</style>
