<template>
    <div class="category">
        <div class="flexPlaceContainer">
            <div class="form-group place">
                <label for="areaSelection">地域</label>
                <select v-model="areaID" class="form-control" id="areaSelection" @change="AreaChanged">
                    <option value="-1">未選択</option>
                    <option v-for="area in arrAreas" v-bind:key="area.id" v-bind:value="area.id">{{ area.name }}</option>
                </select>
            </div>
            <div class="form-group place">
                <label for="prefectureSelection">都道府県</label>
                <select v-model="prefectureID" class="form-control" id="prefectureSelection" @change="PrefChanged">
                    <option value=-1>未選択</option>
                    <option v-for="pref in arrPrefs" v-bind:key="pref.id" v-bind:value="pref.id">{{ pref.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
/* TODO: 地域選択時、都道府県のvalueを初期化 */
import db from '@/firebase/firestore'

export default {
    name: 'PullArea',
    data () {
        return {
            arrPrefs: [],
            arrAreas: [],
            areaID: -1,
            prefectureID: -1,
        }
    },
    props :{
        numArea: {
            type: Number,
            default: -1
        },
        numPref: {
            type: Number,
            default: -1
        }
    },
    computed: {
        chNumArea: function () {
            return this.numArea
        },
        chNumPref: function () {
            return this.numPref
        }
    },
    watch: {
        chNumArea: function ( newVal ) {
            this.areaID = newVal
            this.prefectureID = -1
            this.GetListPref( String( this.areaID ) )
        },
        chNumPref: function ( newVal ) {
            this.prefectureID = newVal
        }
    },
    methods: {
        GetListPref: function ( ID ) {
            this.arrPrefs.splice(0)
            console.log('child GetListPref ' + ID)
            if (ID != '-1') {
                db.firestore().collection('subArea').doc( ID ).get().then(doc => {
                    let i = 0
                    doc.get('names').forEach( value => {
                        var hashPref = []
                        hashPref['id'] = i
                        hashPref['name'] = value
                        this.arrPrefs.push(hashPref)
                        i++
                    })
                })
                this.prefectureID = this.chNumPref
                console.log('child local 3 ' + ID + ' binding: ' + this.chNumPref)
            } else {
                this.prefectureID = -1
                console.log('child local not exists ' + ID + ' binding: ' + this.chNumPref)
            }
        },
        AreaChanged: function () {
            this.$emit( 'catchAreaID', this.areaID )
        },
        PrefChanged: function () {
            this.$emit( 'catchPrefID', this.prefectureID )
        }
    },
    created () {
        /* 地域の取得 */
        this.arrAreas.splice(0)
        var docRef = db.firestore().collection('area')
        docRef.get().then(DocumentSnapshot => {
            DocumentSnapshot.forEach(doc => {
                var arrArea = []
                arrArea['id'] = doc.id
                arrArea['name'] = doc.get('name')
                this.arrAreas.push(arrArea)
            })
        })
    }
}
</script>
<style scoped>
    .category {
        display: flex;
    }
</style>