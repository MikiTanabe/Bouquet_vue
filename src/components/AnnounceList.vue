<template>
    <div>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>件名</th>
                    <th>日付<!-- 順<a href="javascript:void(0)" @click="SortDate(true)">▼</a><a href="javascript:void(0)" @click="SortDate()">▲</a> --></th>
                    <th>カテゴリー</th>
                </tr>
                <tr v-for="announce in arrAnnounces" v-bind:key="announce.get('id')">
                    <td><a href="javascript:void(0)" @click="TitleClick(announce)">{{ announce.get('title') }}</a></td>
                    <td>{{ announce.get('date') }}</td>
                    <td>{{ announce.get('arrCategories') }}</td>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { MapParseObject, SplitArray, FormatDate } from '@/js/gblFunction'

export default {
    name: 'AnnounceList',
    data () {
        return {
            arrAnnounces: []
        }
    },
    methods: {
        GetAnnounceList: async function () {
            return new Promise(resolve => {
                const docRef = db.collection('announce')
                docRef.get().then(documentSnapshot => {
                    var arrAnnounces = []
                    documentSnapshot.forEach(announce => {
                        this.SetCategory(announce.get('category')).then(category => {
                            arrAnnounces.push(new Map([
                                ['title', announce.get('title')],
                                ['date', FormatDate(announce.get('date').toDate(), '/')],
                                ['text', announce.get('text')],
                                ['blnCategories', announce.get('category')],
                                ['arrCategories', SplitArray(category, ', ')]
                            ]))
                        })
                    })
                    resolve(arrAnnounces)
                })
            })
        },
        SetCategory: function (mapCategory) {
            return new Promise(resolve => {
                let wkCategory = new Map(MapParseObject(mapCategory))
                var arrCategories = []
                const docRef = db.collection('announceCategory').doc('categoryString')
                docRef.get().then(doc => {
                    for(let [key, value] of wkCategory){
                        if(value){
                            arrCategories.push(doc.get('String')[key])
                        }
                    }
                    resolve(arrCategories)
                })
            })
        },
        TitleClick: function (mapAnnounce){
            let announceLink = {
                name: 'AnnouncePage',
                params: {
                    mapAnnounce: new Map(mapAnnounce)
                }
            }
            this.$router.push(announceLink).catch(() => {})
            //TODO: お知らせ詳細ページ実装
        }
    },
    created () {
        this.GetAnnounceList().then(arrAnnounces => {
            this.arrAnnounces = arrAnnounces
        })
    }
}
</script>
<style scoped>
</style>