<template>
    <div class="myPageContents">
        <h2>コンサルタントプロフィール</h2>
        <div class="myPageContentchild">
            <div class="m-2">
                <form>
                    <div class="form-group mb-3">
                        <div class="salonImg mb-1">
                            <img src="@/img/salon-no-image.jpg" class="img-fluid">
                        </div>
                        <label for="profileImg">プロフィール画像</label>
                        <input type="file" class="form-control-file" id="profileImg">
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
                                <label>生年月日</label>
                            </div>
                            <div class="col-xs-8">
                                <input type="date" name="birth" class="form-control" v-model="birth">
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
                <p><router-link to="/mysalonInfo">プレビュー</router-link></p>
            </div>
        </div>
    </div>
</template>
<script>
//import { db } from '@/firebase/firestore'
import { getUser } from '@/js/User.js'
//import { FormatDate } from '@/js/gblFunction'
import { GetConsultantProfile } from '@/js/Data'

export default {
    name: 'ProfilePanel',
    data () {
        return {
            userID: '',
            consulName: '',
            certification: '',
            birth: '',
            introduction: '',
            blnShowBirth: false
        }
    },
    methods: {
        
    },
    created () {
        this.userID = getUser()
        GetConsultantProfile( this.userID ).then ( mapProfile => {
            this.consulName = mapProfile[ 'consulName' ]
            this.certification = mapProfile[ 'certification' ]
            this.birth = mapProfile[ 'birth' ]
            this.introduction = mapProfile[ 'introduction' ]
            this.blnShowBirth = mapProfile[ 'showBirth' ]
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

    .borderPink {
        border: 1px solid;
        border-color: pink;
        padding: 5px;
    }

    .salonImg {
        margin: 0 auto;
    }
</style>