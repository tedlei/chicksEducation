<template>
	<view class="lp_app fx pfAllScreen">
		<HeaderView></HeaderView>
		<TableBer @onSelect="onSelect" :settingNum ="topListNum"></TableBer>
		<Sortord @clickSortord = "clickSortord" :topListNum="topListNum"></Sortord>
	</view>
</template>

<script>
import HeaderView from '../../../components/components_lzj/index/header/header.vue'
import TableBer from '../../../components/components_lm/listPage/tableBer.vue'
import Sortord from '../../../components/components_lm/listPage/sortord.vue'
export default {
	components:{HeaderView,TableBer,Sortord},
	data() {
		return {
			topListNum:0,   //选择列表时
		}
	},
	methods: {
		//当切换列表时
		onSelect(num){
			this.topListNum = num
		},
		//选择排序方式时
		clickSortord(obj){
			console.log(obj);
		}
	}
}
</script>

<style scoped lang="scss">
.lp_app{
	flex-direction: column;
}
</style>
