<template>
    <button v-on:click="Search_Click" class="btn btn-primary">検索</button>
</template>
<script>
export default {
    /* `methods` オブジェクトの下にメソッドを定義する */
    name: 'SeachBox',
    methods: {
        Search_Click: function () {
            this.$emit('clickedSearchBox')
            }
    }
}
</script>

<style scoped>
</style>
