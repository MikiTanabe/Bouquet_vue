<template>
    <div>
        <table class="table table-sm">
            <thead>
                <tr><th>イベント名</th><th>状態</th></tr>
            </thead>
            <tbody>
                <tr v-for="item in arrEventList" v-bind:key="item.id"><td>{{ item.title }}</td><td>{{ item.strStatus }}</td></tr>
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