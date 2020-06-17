<template>
    <div>
        <div class="flexPickUpsContainer">
            <div v-for="item in arrSalons" v-bind:key="item.id" class="pickUpsChild col-12 col-sm-2 pr-3 mr-3 mb-2">
                <div>
                    <p class="smallTxt">{{ item.upDate }}</p>
                    <img src="@/img/salon-no-image.jpg" class="img-fluid">
                    <p class="salon-title">{{ item.name }}</p>
                    <p>{{ item.features }}</p>
                    <p>{{ item.prefecture }}  {{ item.subArea }}</p>
                </div>
            </div>
         </div>
    </div>
</template>
<script>
import firebase from '@/firebase/firestore'

export default {
    name: 'PickupSalon',
    data () {
        return {
            arrSalons: []
        }
    },
    created () {
        var db = firebase.firestore()
        /* サロンデータの取得 */
        var docRef = db.collection('salons')
        docRef.orderBy("upDate", "desc").limit(4).get().then(DocumentSnapshot => {
            DocumentSnapshot.forEach(doc => {
                var salon = []
                var strDate = ''
                strDate = this.FormatDate(doc.get('upDate').toDate())
                salon['id'] = doc.id.toString()
                salon['name'] = doc.get('name')
                salon['upDate'] = strDate
                salon['features'] = this.FormatFeatures(doc.get('features'))
                salon['prefecture'] = doc.get('prefecture')
                salon['subArea'] = doc.get('subArea')
                this.arrSalons.push(salon)
            })
        })
    },
    methods: {
        FormatDate: function (date) {
            var rtnDate = ''
            var tYear = date.getFullYear()
            var tMonth = date.getMonth()
            var tDate = date.getDate()
            rtnDate = 'upDate ' + tYear + '-' + tMonth + '-' + tDate
            return rtnDate
        },
        FormatFeatures: function (features) {
            var rtnFeatures = ''
            features.forEach ( function( value ){
                rtnFeatures += value + '／'
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
