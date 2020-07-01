<template>
    <div>
        <table class="table table-sm">
            <thead class="thead-light">
                <tr>
                    <th>タイトル</th>
                    <th>日付</th>
                    <th>概要</th>
                    <th>主催</th>
                    <th>編集/削除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in arrEvent" v-bind:key="item.id">
                    <td>{{ item.eventName }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.introduction }}</td>
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