<template>
    <div>
        <table class="table table-sm">
            <thead class="thead-light">
                <tr>
                    <th class="col-xs-2 text-no-wrap">タイトル</th>
                    <th class="col-xs-2">日付</th>
                    <th class="col-xs-1">概要</th>
                    <th class="col-xs-2">主催</th>
                    <th class="col-xs-1">編集/削除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in arrEvent" v-bind:key="item.id">
                    <td>{{ item.eventName }}</td>
                    <td>{{ item.date }}</td>
                    <td><div class="nowrapElips"><p>{{ item.introduction }}</p></div></td>
                    <td>{{ item.consultantName }} / {{ item.salonName }}</td>
                    <td class="text-center"><a href="javascript:void(0)" @click="EditClick(item.id)"><font-awesome-icon icon="edit" /></a></td>
                </tr>
            </tbody>
        </table>
        <font-awesome-icon icon="plus-square" /> イベントの追加
    </div>
</template>
<script>
import { GetEventData } from '@/js/Data'
import { getUser } from '@/js/User'

export default {
    name: 'EventListEditTb',
    data () {
        return {
            arrEvent: [],
            mapEventLink: { name: 'EventEdit' }
        }
    },
    methods: {
        SetEventList: function () {
            GetEventData( getUser() ).then( arrData => {
                this.arrEvent = arrData
            })
        },
        EditClick: function ( eventId ) {
            this.mapEventLink['params'] = { prpEventId: eventId }
            this.$router.push(this.mapEventLink).catch(() => {})
        }
    },
    created () {
        this.SetEventList()
        
    }
}
</script>
<style scoped>
.nowrapElips {
    width: 100%;
    overflow: hidden;
}
.nowrapElips p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>