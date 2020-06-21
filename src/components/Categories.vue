<template>
<div class="row-0">
<div class="categoryWrapper borderPink col-9 m-2">
    <div class="flexCategoryContainer">
            <ChkCategory ref="chkCategory" @catchCategories="CatchCategories"></ChkCategory>
            <PullArea :numArea="areaID" @catchAreaID="ChangeAreaID" :numPref="prefID" @catchPrefID="ChangePrefID"></PullArea>
            <SearchBox @clickedSearchBox="SearchBox_Click"></SearchBox>
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
    data: function () {
        return {
            areaID: -1,
            prefID: -1,
            mapSearchInfo: [],
            mapCategory: [],
        }
    },
    components: {
        SearchBox,
        ChkCategory,
        PullArea
    },
    methods: {
        ChangeAreaID: function ( value ) {
            this.areaID = Number( value )
        },
        ChangePrefID: function ( value ) {
            this.prefID = Number ( value )
        },
        SearchBox_Click: function () {
            this.$refs.chkCategory.CallSubmit()
            this.mapSearchInfo['AreaID'] = this.areaID
            this.mapSearchInfo['PrefID'] = this.prefID
            this.$emit('doSearch', this.mapSearchInfo)
        },
        CatchCategories: function ( value ) {
            this.mapCategory = value
            this.mapSearchInfo['Category'] = this.mapCategory
        }
    },
    created () {
        this.mapSearchInfo['Category'] = this.mapCategory
        this.mapSearchInfo['AreaID'] = this.areaID
        this.mapSearchInfo['PrefID'] = this.prefID
    }
}
</script>

<style scoped>
    .row-0 {
    margin-left:0px;
    margin-right:0px;
    }
</style>