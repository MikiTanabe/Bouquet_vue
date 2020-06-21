<template>
<div class="row-0">
<div class="categoryWrapper borderPink col-9 m-2">
    <div class="flexCategoryContainer">
            <ChkCategory />
            <PullArea :numArea=-1 :numPref=-1></PullArea>
            <SearchBox />
    </div>
</div>
</div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import ChkCategory from '@/components/ChkCategory.vue'
import PullArea from '@/components/PullArea.vue'


export default {
    name: 'Categories',
    components: {
        SearchBox,
        ChkCategory,
        PullArea
    },
}
</script>

<style scoped>
    .row-0 {
    margin-left:0px;
    margin-right:0px;
    }
</style>