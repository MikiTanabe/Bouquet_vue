<template>
    <div>
        <h1>イベント</h1>
        <OneEventInfo :prpEvId="cmpEvId" />
    </div>
</template>
<script>
import OneEventInfo from '@/components/OneEventInfo'

export default {
    name: 'Eventinfo',
    data () {
        return {
            evid: ''
        }
    },
    components: {
        OneEventInfo
    },
    props: {
        prpEvId: {
            type: String,
            default: ''
        }
    },
    computed: {
        cmpEvId () {
            return this.prpEvId
        }
    },
    created () {
        console.log('イベントページ', this.cmpEvId)
    }
}
</script>