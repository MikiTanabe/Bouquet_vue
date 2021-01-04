<template>
    <div class="myPageContents">
        <SalonCard :prpSid="cmpSid" :prpPrev="true" :prpMapSalon="cmpMapSalon"/>
        <a href="javascript:void(0)" @click="EditClick()">編集ページへ戻る</a>
    </div>
</template>
<script>
import SalonCard from '@/components/SalonCard'
import { getUser } from '@/js/User'

export default {
    name: 'SalonSample',
    data () {
        return {
            userID: '',
            sid: ''
        }
    },
    props: {
        prpSid: {
            type: String,
            default: 'sample'
        },
        prpMapSalon: {
            type: Map,
            default: () => new Map()
        }
    },
    computed: {
        cmpSid: function(){
            return this.prpSid
        },
        cmpMapSalon: function(){
            return this.prpMapSalon
        }
    },
    components: {
        SalonCard
    },
    methods: {
        EditClick: function () {
            console.log('編集ページへ戻すデータ: ', this.cmpMapSalon)
            let editLink = {
                name: 'MySalonInfo',
                params: {
                    fromPrev: true,
                    mapSalonEdit: this.cmpMapSalon
                }
            }
            this.$router.push(editLink).catch(() => {})
        }
    },
    created () {
        this.userID = getUser()
    }
}
</script>
<style scoped>
.myPageContents {
        margin-left: 20px;
    }

</style>