<template>
    <div class="col-12">
        <h5>お知らせ</h5>
        <AnnounceList />
    </div>
</template>
<script>
import AnnounceList from '@/components/AnnounceList'

export default {
    name: 'Announce',
    data() {
        return {

        }
    },
    components: {
        AnnounceList
    }
}
</script>
<style scoped>

</style>