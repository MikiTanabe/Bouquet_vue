<template>
    <div class="myPageContents">
        <h2>サロン情報の編集</h2>
        <div class="myPageContentchild">
            <form>
                <!-- サロン名 -->
                <div class="form-group">
                    <label>サロン名</label>
                    <input type="text" v-model="salonTitle">
                </div>
                <!-- ファイルアップロード -->
                <p>サロン画像(自動リサイズされます)</p>
                <div class="images">
                    <img :src="imageRefUrl" class="image-fluid">
                </div>
                <div class="form-group">
                    <label>イメージの変更：</label>
                    <input type="file" v-on:change="SelectImg">
                    <!-- <p class="smallTaxt">一般会員は1枚のみアップロード可能。プロ会員になると最大10枚まで追加できます。</p> -->
                </div>
                <!-- チェックボックス -->
                <h5>メニューの設定</h5>
                <ChkCategory ref="chkCategory" :prpMapBlnFeatures="mapBlnFeatures" @catchCategories="CatchCategories"></ChkCategory>
                <h5>地域の設定</h5>
                <PullArea :numArea="prNumArea" @catchAreaID="ChangePrNumArea" :numPref="prNumPref" @catchPrefID="ChangePrNumPref"></PullArea>
                <div class="form-group">
                    <label>詳細地域（港区 表参道 など）</label>
                    <input type="text" v-model="txtSubArea">
                </div>
                <h5>サロン紹介文</h5>
                <div class="form-group col-8">
                    <textarea id="introduction" name="introduction" rows="8" cols="20" class="form-control" v-model="txtIntroduction"></textarea>
                </div>
                <h5>SNS連携(任意)</h5>
                <div class="form-group">
                    <table class="table col-5 table-sm table-borderless">
                        <tr><td><label>Instagram</label></td><td><input type="text" v-bind="urlInsta"></td></tr>
                        <tr><td><label>FaceBook</label></td><td><input type="text" v-bind="urlFaceBook"></td></tr>
                        <tr><td><label>WEAR</label></td><td><input type="text" v-bind="urlWear"></td></tr>
                        <tr><td><label>ブログ</label></td><td><input type="text" v-bind="urlBlog"></td></tr>
                    </table>
                </div>
                <button v-on:click.prevent="AddOrModify" class="btn btn-primary">保存</button>
            </form>
        </div>
    </div>
</template>
<script>
import ChkCategory from '@/components/ChkCategory.vue'
import PullArea from '@/components/PullArea.vue'
import firebase from '@/firebase/firestore'
import { getSnapShot, uploadImgs, getSalonImgUrl } from '@/js/Picture'

export default {
    name: 'SalonInfoPanel',
    components: {
        ChkCategory,
        PullArea
    },
    data () {
        return {
            imgsSelected: null,
            imageRefUrl: '',
            salonTitle: 'サロン名',
            salonID: '',
            txtSubArea: '詳細地域',
            txtIntroduction: 'サロン紹介文',
            prNumArea: -1,
            prNumPref: -1,
            urlInsta: '',
            urlBlog: '',
            urlFaceBook: '',
            urlWear: '',
            blnAuth: false,
            userID: '',
            blnHaveSalon: false,
            mapAreas: {},
            mapPrefs: {},
            mapFeatures: {},
            mapBlnFeatures: {}
        }
    },
    methods: {
        getSalonInfo: async function () {
            var docRef = firebase.firestore().collection('salons')
            var query = docRef.where("userID", "==", this.userID)
            /* サロンデータの取得 */
            return query.get().then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        this.salonID = doc.id
                        this.salonTitle = doc.get('name')
                        this.txtSubArea = doc.get('subArea')
                        this.txtIntroduction = doc.get('introduction')
                        this.blnHaveSalon = true
                        this.prNumArea = doc.get('area')['id']
                        this.prNumPref = doc.get('prefecture')['id']
                        this.mapBlnFeatures = doc.get('features')
                    } else {
                        this.blnHaveSalon = false
                    }
                })
                return this.salonID
            })
        },
        GetAreaInfo: function () {
            /* 地域の取得 */
            var areaRef = firebase.firestore().collection('area')
            areaRef.get().then( querySnapShot => {
                querySnapShot.forEach( doc => {
                    if( doc.exists ) {
                        this.mapAreas[ doc.id ] = doc.get('name')
                    }
                })
            })

            /* 県の取得 */
            var prefRef = firebase.firestore().collection('subArea')
            prefRef.get().then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    if( doc.exists ) {
                        this.mapPrefs[doc.id] = doc.get('names')
                    }
                })
            })
        },
        CreateSalon: function ( SalonData ) {
                firebase.firestore().collection("salons").add( SalonData )
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                })
        },
        ModifySalon: function ( salonID, salonData ) {
            var salonRef = firebase.firestore().collection('salons').doc(salonID)
                    salonRef.set( salonData )
        },
        AddOrModify: function ( ) {
            try {
                if ( this.prNumPref == -1 || this.prNumArea == -1) {
                    throw new Error('地域を選択してください');
                } else {
                    this.$refs.chkCategory.CallSubmit()
                    var mapSalonData = this.SetMapSalonInfo()
                    if ( this.blnHaveSalon ) {
                        this.ModifySalon( this.salonID, mapSalonData )
                        this.addImgs()
                        alert('サロン情報を更新しました')
                    } else {
                        this.CreateSalon( mapSalonData )
                        alert('サロンを新規登録しました')
                    }
                }
            } catch ( e ) {
                alert(e.message)
            }
        },
        SetMapSalonInfo: function () {
            var mapSalonData = {
                    name: this.salonTitle,
                    area: {id:this.prNumArea, name:this.mapAreas[String(this.prNumArea)]},
                    prefecture: {id:this.prNumPref, name:this.mapPrefs[String(this.prNumArea)][String(this.prNumPref)]},
                    subArea: this.txtSubArea,
                    introduction: this.txtIntroduction,
                    userID: this.userID,
                    upDate: new Date(),
                    features: this.mapFeatures,
                    //img: this.imageRefUrl
                }
            return mapSalonData
        },
        SelectImg: function ( img ) {
            this.imgsSelected = img.target.files
        },
        addImgs: function () {
            if (this.imgsSelected != null) {
                uploadImgs( this.salonID, this.imgsSelected )  // 4
            }
        },
        GetSalonImg: function () {
            getSalonImgUrl( this.salonID ).then( url => {
                console.log(this.salonID)
                this.imageRefUrl = url
                console.log('got Img!: ' + this.imageRefUrl)
            })
            /* TODO: 画像取得できなかったときの処理 */
            .catch( noImgUrl  => {
                this.imageRefUrl = noImgUrl
                console.log('noImg')
                console.log(noImgUrl)
            })
        },
        GetVariableImgs: function () {
            this.uid = firebase.auth().currentUser.uid
            getSnapShot(this.userID, (data) => {   //5
            this.imgs = data
            })
        },
        ChangePrNumArea: function ( areaID ) {
            this.prNumArea = Number( areaID )
            this.prNumPref = -1
        },
        ChangePrNumPref: function ( prefID ) {
            this.prNumPref = Number( prefID )
        },
        CatchCategories: function ( value ) {
            Object.keys( value ).forEach( key => {
                var arrValues = []
                value[key].forEach( function ( array ) {
                    Object.keys( array ).forEach( function ( chKey ) {
                        if ( array[ chKey ] == true ) {
                            console.log(array['text'])
                            arrValues.push( array[ 'text'] )
                        }
                    })
                })
                this.mapFeatures[key] = arrValues
            })
        },
    },
    created() {
        this.GetAreaInfo()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userID = firebase.auth().currentUser.uid
                this.blnAuth = true
                this.getSalonInfo().then ( salonid => {
                    console.log('サロンID取得: ' + salonid)
                    this.GetSalonImg()
                })
            } else {
                this.name = ''
                this.blnAuth = false
                this.$router.push('/signin')
            } 
        })
    }
}
</script>

<style scoped>
    h2 {
        font-size: 130%;
    }

    h3 {
        font-size: 110%;
    }

    h4 {
        font-size: 100%;
    }

    ul {
        list-style: none;
        padding: 0px;
        margin: 5px;
    }

    .myPageContents {
        margin-left: 20px;
    }

    .myPageContentchild {
        padding-bottom: 10px;
    }
</style>