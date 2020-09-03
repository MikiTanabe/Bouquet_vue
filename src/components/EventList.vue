<template>
    <div>
        <div class="flexEventContainer col-8">
            <div v-for="item in arrEvents" v-bind:key="item.id" class="eventChild col-12 col-md-6 pb-1 pr-1">
                <div class="eventImg">
                    <img :src="item.imgUrl" class="img-fluid">
                </div>
                <div class="eventInfo ml-1">
                    <a href="javascript:void(0)" @click="EventClick(item.id)">{{ item.eventName }}</a>
                    <p class="introduction">{{ item.introduction }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
//import { getEventImgUrl } from '@/js/Picture'
import { GetMidnight } from '@/js/gblFunction'

export default {
    name: 'EventList',
    data () {
        return {
            arrEvents: []
        }
    },
    methods: {
        //TODO: データ取得完了後次の処理(非同期処理の制御を再調査)
        GetEventList: async function () {
            var docRef = db.collection( 'events' )
            var arrEv = []
            await docRef.where( 'date', '>=', GetMidnight( new Date() ) ).get().then( DocumentSnapshot => {
                DocumentSnapshot.forEach( doc => {
                    if( doc.id != 'sample' ) {
                        //TODO: 更新日順にソートアルゴリズム
                        var mapEvent = {}
                        mapEvent[ 'id' ] = doc.id
                        mapEvent[ 'eventName' ] = doc.get( 'title' )
                        mapEvent[ 'introduction' ] = doc.get( 'introduction' )
                        mapEvent[ 'upDate' ] = doc.get( 'upDate' )
                        /* getEventImgUrl( doc.id ).then( ImgUrl => {
                            mapEvent[ 'imgUrl' ] = ImgUrl
                            arrEv.push( mapEvent )
                            console.log('データ用意完了', arrEv )
                        }) */
                        mapEvent[ 'imgUrl' ] = doc.get( 'imgUrl' )
                        arrEv.push( mapEvent )
                    }
                })
            })
            for ( let i = 0; i < arrEv.length; i++ ){
                for (let j = arrEv.length - 1; j > i; j-- ) {
                    if( arrEv[j].upDate > arrEv[j - 1].upDate ){
                        var t = arrEv[j]
                        arrEv[j] = arrEv[j - 1]
                        arrEv[j - 1] = t
                    }
                }
            }
            for ( let l = 0; l < 6; l++ ){
                if ( arrEv.length <= l ) {
                    break
                }
                this.arrEvents.push( arrEv[l] )
            }
        },
        EventClick: function ( evid ) {
            console.log('イベントクリック', evid)
            //TODO: イベントIDをイベント情報ページに渡す
            this.$router.push({
                prpEvId: evid,
                name: 'EventInfo'
            }).catch(() => {})
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

    .introduction {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>