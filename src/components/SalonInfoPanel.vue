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
                <p>サロン画像</p>
                <div class="images">
                    <p>チェックをつけたメイン画像がサムネイルに使用されます。</p>
                    <img src="@/img/salon-no-image.jpg" class="image-fluid">
                    <div class="checkbox">
                        <input type="checkbox">
                    </div>
                </div>
                <div class="form-group">
                    <label>イメージの追加</label>
                    <input type="file">
                    <p class="smallTaxt">一般会員は1枚のみアップロード可能。プロ会員になると最大10枚まで追加できます。</p>
                </div>
                <!-- チェックボックス -->
                <h5>メニューの設定</h5>
                <ChkCategory></ChkCategory>
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
                <!-- 送信ボタン -->
                <button v-on:click="AddOrModify" class="btn btn-primary">保存</button>
            </form>
        </div>
    </div>
</template>
<script>
import ChkCategory from '@/components/ChkCategory.vue'
import PullArea from '@/components/PullArea.vue'
import firebase from '@/firebase/firestore'

export default {
    name: 'SalonInfoPanel',
    components: {
        ChkCategory,
        PullArea
    },
    data () {
        return {
            salonTitle: '',
            salonID: '',
            txtSubArea: '',
            txtIntroduction: 'サロン紹介文',
            prNumArea: -1,
            prNumPref: -1,
            urlInsta: '',
            urlBlog: '',
            urlFaceBook: '',
            urlWear: '',
            blnAuth: false,
            userID: '',
            blnHaveSalon: false
        }
    },
    methods: {
        getSalonInfo: function () {
            var docRef = firebase.firestore().collection('salons')
            var query = docRef.where("userID", "==", this.userID)
            /* サロンデータの取得 */
            query.get().then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        this.salonID = doc.id
                        this.salonTitle = doc.get('name')
                        this.txtSubArea = doc.get('subArea')
                        this.txtIntroduction = doc.get('introduction')
                        this.blnHaveSalon = true
                        this.prNumArea = doc.get('area')['id']
                        this.prNumPref = doc.get('prefecture')['id']
                        console.log('area: ' + this.prNumArea + 'pref: ' + this.prNumPref)
                    } else {
                        this.blnHaveSalon = false
                    }
                })
            })
        },
        CreateSalon: function () {
                firebase.firestore().collection("salons").add({
                    name: this.salonTitle,
                    subArea: this.txtSubArea,
                    introduction: this.txtIntroduction,
                    userID: this.userID
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                })
        },
        AddOrModify: function ( ) {
                if ( this.blnHaveSalon ) {
                    this.ModifySalon(this.salonID)
                } else {
                    this.CreateSalon()
                }
        },
        ModifySalon: function ( salonID ) {
            var salonRef = firebase.firestore().collection('salons').doc(salonID)
                    salonRef.set({
                        name: this.salonTitle,
                        subArea: this.txtSubArea,
                        introduction: this.txtIntroduction,
                        userID: this.userID
                    })
        },
        ChangePrNumArea: function ( areaID ) {
            this.prNumArea = Number( areaID )
            this.prNumPref = -1
        },
        ChangePrNumPref: function ( prefID ) {
            this.prNumPref = Number( prefID )
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
            this.userID = firebase.auth().currentUser.uid
            this.blnAuth = true
            this.getSalonInfo()
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