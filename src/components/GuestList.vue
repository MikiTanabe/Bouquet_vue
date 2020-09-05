<template>
<!-- TODO: Bootstrapでカルーセルを使ってスライド機能を実装する -->
    <div class="col-10 p-4">
        <div id="guestlist1" class="carousel slide">
            <div class="carousel inner">
                <div v-for="item in arrGuests" v-bind:key="item.consultantID" class="carousel item">
                    <img :src="item.profileImgUrl" class="img-fluid">
                    <p><a href="javascript:void(0)" @click="GuestClick(item.consultantID)">{{ item.consulName }}</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetOneEventData, GetConsultantProfile } from '@/js/Data'

export default {
    name: 'GuestList',
    data () {
        return {
            arrGuests: [],
        }
    },
    props: {
        prpEvId: {
            type: String,
            default: 'sample'
        }
    },
    computed: {
        cmpEvId () {
            return this.prpEvId
        }
    },
    methods: {
        GetGuestsList: function () {
            GetOneEventData( this.prpEvId ).then( mapEvent => {
                mapEvent[ 'join' ].forEach( id => {
                    GetConsultantProfile( id ).then( mapUser => {
                        this.arrGuests.push( mapUser )
                    })
                })
            })
        }
    },
    created () {
        this.GetGuestsList()
    }
}
</script>
<style scoped>

</style>