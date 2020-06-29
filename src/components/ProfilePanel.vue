<template>
    <div class="myPageContents">
        <h2>コンサルタントプロフィール</h2>
        <div class="myPageContentchild">
            <div class="salon col-12">
                <div class="borderPink">
                    <div class="salonImg">
                        <img src="@/img/salon-no-image.jpg" class="img-fluid">
                    </div>
                    <div class="profileInfo m-2">
                        <table class="table table-sm">
                        <tbody>
                            <tr><td class="table-info">名前</td><td>{{ consulName }}</td></tr>
                            <tr><td class="table-info">生年月日</td><td>{{ birth }}</td></tr>
                            <tr><td class="table-info">資格</td><td>{{ certification }}</td></tr>
                            <tr><td class="table-info">自己紹介</td><td>{{ introduction }}</td></tr>
                        </tbody>
                        </table>
                        <router-link to="/mysalonInfo">コンサルタント情報の編集</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '@/firebase/firestore'
import { getUser } from '@/js/User.js'
import { FormatDate } from '@/js/gblFunction'

export default {
    name: 'ProfilePanel',
    data () {
        return {
            userID: '',
            consulName: '',
            certification: '',
            birth: '',
            introduction: ''
        }
    },
    methods: {
        GetInfo: function ( uid ) {
            var docRef = db.collection('consultants')
            var query = docRef.where("uid", "==", uid)
            /* コンサルタントプロフィールの取得 */
            query.get().then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    if (doc.exists) {
                        this.consulName = doc.get('name')
                        this.certification = doc.get('certification')
                        this.birth = FormatDate(doc.get('birth').toDate(), '/')
                        this.introduction = doc.get('introduction')
                    } 
                })
            })
        }
    },
    created () {
        this.userID = getUser()
        this.GetInfo( this.userID )
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

    .profileInfo {
        margin: 0px 10px;
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