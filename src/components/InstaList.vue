<template>
    <div  class="thumbnail-container">
        <div v-for="item in medias" v-bind:key="item.id" class="col-sm-5 col-md-3">
            <div class="pr-sm-0 pr-md-1">
                <a :href="item.url" target="_blank"><img :src="item.mediaType=='VIDEO'?item.thumbnailUrl:item.mediaUrl" class="img-fluid"></a>
            </div>
        </div>
    </div>
</template>
<script>
import { getInsta } from '@/js/insta.js'

export default {
    name: 'InstaList',
        data () {
            return {
                medias: [],
            }
        },
        created () {
            getInsta(5).then(result => {
                this.medias = result
            })
        }
    }
</script>
<style scoped>
    .thumbnail-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
    }
</style>
