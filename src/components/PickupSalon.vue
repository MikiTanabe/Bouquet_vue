<template>
    <div>
        <div class="flexPickUpsContainer">
            <div v-for="item in arrSalons" v-bind:key="item.id" class="pickUpsChild col-12 col-sm-2 pr-3 mr-3 mb-2">
                <div>
                    <p class="smallTxt">{{ item.upDate }}</p>
                    <img :src="item.imgUrl" class="img-fluid">
                    <p class="salon-title">{{ item.name }}</p>
                    <p>{{ item.features }}</p>
                    <p>{{ item.prefecture }}  {{ item.subArea }}</p>
                </div>
            </div>
         </div>
    </div>
</template>
<script>
import db from '@/firebase/firestore'
import { getSalonImgUrl } from '@/js/Picture'
import { FormatDate } from '@/js/gblFunction'

export default {
    name: 'PickupSalon',
    data () {
        return {
            arrSalons: []
        }
    },
    created () {
        /* サロンデータの取得 */
        var docRef = db.firestore().collection('salons')
        docRef.orderBy("upDate", "desc").limit(4).get().then(DocumentSnapshot => {
            DocumentSnapshot.forEach(doc => {
                var salon = []
                var strDate = ''
                getSalonImgUrl( doc.id.toString() ).then( url => {
                    strDate = 'upDate ' + FormatDate(doc.get('upDate').toDate(), '-')
                    salon['id'] = doc.id.toString()
                    salon['name'] = doc.get('name')
                    salon['upDate'] = strDate
                    salon['features'] = this.FormatFeatures(doc.get('features'))
                    salon['prefecture'] = doc.get('prefecture')['name']
                    salon['subArea'] = doc.get('subArea')
                    salon['imgUrl'] = url
                    this.arrSalons.push(salon)
                })
            })
        })
    },
    methods: {
        /* FormatDate: function (date) {
            var rtnDate = ''
            var tYear = date.getFullYear()
            var tMonth = date.getMonth() + 1
            var tDate = date.getDate()
            rtnDate = 'upDate ' + tYear + '-' + tMonth + '-' + tDate
            return rtnDate
        },*/
        FormatFeatures: function (features) {
            var rtnFeatures = ''
            Object.keys( features ).forEach ( key => {
                features[key].forEach ( feature => {
                    rtnFeatures += feature + '／'
                })
            })
            rtnFeatures = rtnFeatures.slice(0, -1)
            return rtnFeatures
        }
    }
}
</script>
<style scoped>
    .flexPickUpsContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .pickUpsChild {
        border: 1px solid;
        border-color: pink;
        align-items: flex-start;
    }

    .salon-title {
        font-size: large;
        margin-top: 2px;
    }
</style>
