<template>
    <div class="col-12">
        <div class="frame mb-2">
            <div class="title pl-2 pr-2">
                <p>{{ cpMapAnnounce.get('title') }}</p>
                <p>{{ cpMapAnnounce.get('date') }}</p>
            </div>
            <div class="text p-2">
                <p>{{ '  ' + cpMapAnnounce.get('text') }}</p>
                <p></p>
            </div>
        </div>
        <router-link to="announce">>>お知らせの一覧に戻る</router-link>
    </div>  
</template>
<script>
export default {
    name: 'AnnouncePage',
    data() {
        return {

        }
    },
    props: {
        mapAnnounce: {
            type: Map,
            default: new Map()
        }
    },
    computed: {
        cpMapAnnounce: function () {
            return this.mapAnnounce
        }
    }
}
</script>
<style scoped>
.frame {
    border: 1px DarkGray solid;
}

.title {
    background-color: Gainsboro;
    display: flex;
    justify-content: space-between;
}

.text p {
    white-space: pre-wrap;
    align-self: center;
}
</style>