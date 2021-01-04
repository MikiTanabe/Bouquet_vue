<template>
    <div  class="thumbnail-container">
        <div v-for="item in videos" v-bind:key="item.videoId" class="col-sm-5 col-md-3">
            <div class="pr-sm-0 pr-md-1">
                <a :href="item.url" target="_blank"><img :src="item.thumbnail" :alt="item.title" class="img-fluid"></a>
            </div>
        </div>
    </div>
</template>
<script>
import { getVideos } from '@/js/youtu.js'

export default {
    name: 'YoutubeList',
        data () {
            return {
                videos: [],
                maxResults: 5,
                api_key: 'AIzaSyCzvvwMjjtjzXRrE-CZjM_ndN6C8F45Ios'
            }
        },
        created () {
            getVideos(this.maxResults).then(result => {
                this.videos = result
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
