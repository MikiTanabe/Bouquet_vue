<template>
    <div>
        <table class="table table-sm">
            <thead>
                <tr><th>イベント名</th><th>状態</th></tr>
            </thead>
            <tbody>
                <tr v-for="item in arrEventList" v-bind:key="item.id">
                    <td><a href="javascript:void(0)" @click="EvTitleClick(item.id)">{{ item.title }}</a></td><td>{{ item.strStatus }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { GetEventAlert } from '@/js/Alert'
import { getUser } from '@/js/User'

export default {
    name:'ApproveEventList',
    data () {
        return {
            arrEventList: []
        }
    },
    methods: {
        EvTitleClick: function ( evid ) {
            console.log('EvTitleClick: ',evid)
            var mapEventLink = {
                name: 'OneEventInfo',
                params: {
                      prpEvId: evid
                }
            }
            this.$router.push(mapEventLink).catch(() => {})
        }
    },
    created () {
        GetEventAlert( getUser() ).then( arrEvent => {
            arrEvent.forEach( event => {
                if ( event.status == 'preJoin' ) {
                    event[ 'strStatus' ] = '招待中'
                } else {
                    event[ 'strStatus' ] = '招待取消'
                }
                this.arrEventList.push( event )
            })
        })
    }
}
</script>