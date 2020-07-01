<template>
    <div>
        <div class="flexEventContainer col-8">
            <div v-for="item in arrEvents" v-bind:key="item.id" class="eventChild col-12 col-md-6 pb-1 pr-1">
                <div class="eventImg">
                    <img :src="item.imgUrl" class="img-fluid">
                </div>
                <div class="eventInfo ml-1">
                    <h6>{{ item.eventName }}</h6>
                    <p>{{ item.introduction }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getEventImgUrl } from '@/js/Picture'

export default {
    name: 'EventList',
    data () {
        return {
            arrEvents: []
        }
    },
    methods: {
        GetEventList: function () {
            var docRef = db.collection( 'events' )
            console.log('GetEventList')
            docRef.orderBy( 'upDate', 'desc' ).limit(6).get().then( DocumentSnapshot => {
                DocumentSnapshot.forEach( doc => {
                    var mapEvent = {}
                    mapEvent[ 'id' ] = doc.id
                    mapEvent[ 'eventName' ] = doc.get( 'title' )
                    mapEvent[ 'introduction' ] = doc.get( 'introduction' )
                    getEventImgUrl( doc.id ).then( ImgUrl => {
                        mapEvent[ 'imgUrl' ] = ImgUrl
                        this.arrEvents.push( mapEvent )
                    })
                })
            })
        }
    },
    created () {
        this.GetEventList()
    }
}
</script>

<style scoped>
    .flexEventContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .eventChild {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 3px;
    }
    .eventInfo {
        display: flex;
        flex-flow: column;
    }
</style>