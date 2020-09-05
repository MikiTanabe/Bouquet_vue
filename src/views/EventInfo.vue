<template>
    <div>
        <h1>{{ evid }}</h1>
        <OneEventInfo v-bind:prp-ev-id="cmpId" />
        <GuestList v-bind:prp-ev-id="cmpId" />
    </div>
</template>
<script>
import OneEventInfo from '@/components/OneEventInfo'
import GuestList from '@/components/GuestList'

export default {
    name: 'Eventinfo',
    data () {
        return {
            evid: ''
        }
    },
    components: {
        OneEventInfo,
        GuestList
    },
    props: {
        prpId: {
            type: String,
            default: 'sample'
        }
    },
    computed: {
        cmpId () {
            return this.prpId
        }
    }
}
</script>