<template>
    <div>
        <table class="table table-sm">
            <thead class="clLavender">
                <tr>
                    <th>タイトル</th>
                    <th>日付</th>
                    <th>概要</th>
                    <th>主催</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in arrEvents" v-bind:key="event.get('id')">
                    <td><a href="javascript:void(0)" @click="EventClick(event.get('id'))">{{ event.get('title') }}</a></td>
                    <td>{{ event.get('date') }}</td>
                    <td>{{ event.get('introduction') }}</td>
                    <td>{{ event.get('consultantName') }} / {{ event.get('salonName') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/js/User'
import { FormatDate, GetMidnight } from '@/js/gblFunction'

export default {
    name: 'JoinEventList',
    data () {
        return {
            arrEvents: [],
            uId: ''
        }
    },
    methods: {
        GetJoinEvent: async function (){
            return new Promise(resolve => {
                const docRef = db.collection('events')
                var wkArrEvents = []
                docRef.get().then(documentSnapshot => {
                    documentSnapshot.forEach(doc => {
                        doc.get('join').forEach(id => {
                            let today = doc.get('date').toDate()
                            today.setDate(today.getDate() + 1)
                            if(id==this.uId && GetMidnight(today) >= new Date()){
                                wkArrEvents.push(
                                    new Map([     
                                        ['id', doc.id],
                                        ['consultantName', doc.get('consultantName')],
                                        ['date', doc.get('date')],
                                        ['introduction', doc.get('introduction')],
                                        ['salonId', doc.get('salonId')],
                                        ['salonName', doc.get('salonName')],
                                        ['title', doc.get('title')],
                                    ])
                                )
                            }
                        })
                    })
                    resolve(wkArrEvents.slice())
                })
            })
        },
        EventClick: function (evId) {
            let EventLink = {
                name: 'EventInfo',
                params: {
                    prpId: evId
                }
            }
            this.$router.push(EventLink).catch(() => {})
        }
    },
    created() {
        this.uId = getUser()
        this.GetJoinEvent().then( wkArrEvents => {
            wkArrEvents.forEach(event => {
                let wkDate = event.get('date').toDate()
                event.set('date', FormatDate(wkDate, '-'))
            })
            this.arrEvents = wkArrEvents.slice()
        })
    }
}
</script>
<style scoped>
    .clLavender{
        background-color: LavenderBlush;
    }
</style>