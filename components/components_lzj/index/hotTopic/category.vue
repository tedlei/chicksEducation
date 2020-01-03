<template>
    <div>
       <listOption :value="item" 
				    v-for="(item, idx) in titleArr" 
					:selectArrValue="selectArr[idx]" 
					:key="idx"/>
    </div>
</template>

<script>
    import listOption from './listOption.vue'
    export default {
        components: {listOption},
        data(){
            return {
                selectArr: ['小学辅导', '中学辅导', '艺术培训', '学历提升', '职业培训', 'other'],
                titleArr: ['小学热门推荐课程', '中学热门推荐课程', '艺术热门推荐课程', '学历热门推荐课程', '职业热门推荐课程'],
                advertisingSix: []  // 广告位
            }
        }
    }
</script>