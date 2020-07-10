<template>
    <div>
        <h2 class="bd1">イベント情報</h2>
        <div class="col-md-10 offset-md-1">
            <h3>{{ mapEventData.title }}</h3>
            <div class="col-md-4 offset-md-4 col-xs-10 offset-xs-1">
                <img :src="mapEventData.imgUrl" class="img-fluid">
            </div>
            <p>主催者: {{ mapEventData.consulName }}</p>
            <p>開催日: {{ mapEventData.date }}</p>
            <p class="introduction clCrimson">{{ mapEventData.introduction }}</p>
        </div>
    </div>
</template>
<script>
import { GetOneEventData } from '@/js/Data'

export default {
    name: 'OneEventInfo',
    data () {
        return {
            mapEventData: {}
        }
    },
    props: {
        prpEvId: {
            type: String,
            default: ''
        }
    },
    computed: {
        cmpEvId: function () {
            return this.prpEvId
        }
    },
    created () {
        console.log(this.cmpEvId)
        GetOneEventData( this.cmpEvId ).then( mapEvent => {
            this.$set( this.mapEventData, 'title', mapEvent[ 'title' ] )
            this.$set( this.mapEventData, 'introduction', mapEvent[ 'introduction' ] )
            this.$set( this.mapEventData, 'consulName', mapEvent[ 'consultantName' ] )
            this.$set( this.mapEventData, 'date', mapEvent[ 'date' ] )
            this.$set( this.mapEventData, 'salonId', mapEvent[ 'salonId' ] )
            this.$set( this.mapEventData, 'salonName', mapEvent[ 'salonName' ] )
            this.$set( this.mapEventData, 'imgUrl', mapEvent[ 'imgUrl' ] )
            console.log('Get: ', this.mapEventData)
        })
    }
}
</script>

<style scoped>
    h2 {
        font-size: 130%;
    }

    h3 {
        font-size: 110%;
    }

    h4 {
        font-size: 100%;
    }

    ul {
        list-style: none;
        padding: 0px;
        margin: 5px;
    }

    .bd1 {
        border-bottom: 1px solid black;
    }

    .introduction {
        word-wrap: break-word;
    }
</style>