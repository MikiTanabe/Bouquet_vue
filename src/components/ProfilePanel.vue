<template>
    <div class="myPageContents">
        <h2>コンサルタントプロフィール</h2>
        <div class="myPageContentchild">
            <div class="m-2">
                <form>
                    <div class="form-group mb-3">
                        <div class="salonImg mb-1">
                            <img :src="profileImgUrl" class="img-fluid">
                        </div>
                        <label for="profileImg">プロフィール画像</label>
                        <input type="file" class="form-control-file" id="profileImg" v-on:change="SelectImg">
                    </div>
                    <div class="form-group mb-2">
                        <div class="row">
                            <div class="col-xs-4 mr-2">
                                <label>名前</label>
                            </div>
                            <div class="col-xs-8">
                                <input type="text" name="consulName" class="form-control" v-model="consulName">
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="row">
                            <div class="col-xs-4 mr-2">
                                <label for="birth">生年月日</label>
                            </div>
                            <div class="col-xs-8">
                                <input type="date" name="birth" class="form-control" v-model="birth">
                                <label for="chkBirth">誕生年を表示する</label>
                                <input type="checkbox" name="chkBirth" v-model="blnShowBirth">
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="row">
                            <label>資格など</label>
                            <textarea v-model="certification" name="certification" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group mb-2">
                        <div class="row">
                            <label>自己紹介</label>
                            <textarea v-model="introduction" class="form-control" name="introduction"></textarea>
                        </div>
                    </div>
                </form>
                <p><router-link to="profilesample">プレビュー</router-link></p>
                <button class="btn btn-primary" v-on:click.prevent="AddOrModify">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/js/User.js'
import { BqDateParse } from '@/js/gblFunction'
import { GetConsultantProfile, GetSalonName } from '@/js/Data'
import { uploadProfileImgs, getProfileImgUrl } from '@/js/Picture'

export default {
    name: 'ProfilePanel',
    data () {
        return {
            userID: '',
            salonName: '',
            consulID: '',
            consulName: '',
            certification: '',
            birth: '',
            introduction: '',
            profileImgUrl: '',
            imgsSelected: null,
            blnShowBirth: false,
            blnHaveProfile: false
        }
    },
    methods: {
        SelectImg: function ( img ) {
            this.imgsSelected = img.target.files
        },
        addImgs: async function () {
            if (this.imgsSelected != null) {
                await uploadProfileImgs( this.consulID, this.imgsSelected ).then( url => {
                    this.profileImgUrl = url
                })
            }
        },
        CreateProfile: function ( profileData ) {
                db.collection("consultants").add( profileData )
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                })
        },
        ModifyProfile: function ( consultantID, profileData ) {
            var profRef = db.collection('consultants').doc(consultantID)
            profRef.set( profileData )
        },
        AddOrModify: async function () {
            try {
                await this.addImgs()
                var mapProfile = this.SetMapProfile()
                if ( this.blnHaveProfile ) {
                    this.ModifyProfile( this.consulID, mapProfile )
                    alert('コンサルタントプロフィールを更新しました')
                } else {
                    this.CreateProfile( mapProfile )
                    alert('コンサルタントプロフィールを新規登録しました')
                }
            } catch ( e ) {
                alert(e.message)
            }
        },
        SetMapProfile: function () {
            var mapProfileData = {
                uid: this.userID,
                consulName: this.consulName,
                salonName: this.salonName,
                certification: this.certification,
                birth: BqDateParse( this.birth ),
                introduction: this.introduction,
                profileImgUrl: this.profileImgUrl,
                showBirth: this.blnShowBirth,
                keyWords: [ this.consulName, this.salonName ]
            }
            return mapProfileData
        },
    },
    created () {
        this.userID = getUser()
        GetConsultantProfile( this.userID ).then ( mapProfile => {
            this.consulID = mapProfile[ 'consultantID' ]
            this.consulName = mapProfile[ 'consulName' ]
            this.certification = mapProfile[ 'certification' ]
            this.birth = mapProfile[ 'birth' ]
            this.introduction = mapProfile[ 'introduction' ]
            this.blnShowBirth = mapProfile[ 'blnShowBirth' ]
            this.blnHaveProfile = mapProfile[ 'blnHaveProfile' ]
            return this.consulID
        })
        .then( consulid => {
            getProfileImgUrl( consulid ).then ( url => {
                this.profileImgUrl = url
            })
        })
        .then( GetSalonName( this.userID ).then( salon => {
            this.salonName = salon
        }))
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

    .borderPink {
        border: 1px solid;
        border-color: pink;
        padding: 5px;
    }

    .salonImg {
        margin: 0 auto;
    }
</style>