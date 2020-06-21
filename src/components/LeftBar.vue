<template>
    <div class="leftBar">
        <div class="menuBar">
            <h3>メニュー</h3>
            <ul class="menu">
                <li><router-link to="/mysaloninfo">マイサロン情報の編集</router-link></li>
                <li><router-link to="/mycouncilprof">コンサルタント情報の編集</router-link></li>
                <li><router-link to="/mysalon">お気に入りサロン</router-link></li>
                <li><router-link to="/myeventinfo">イベントの管理</router-link></li>
            </ul>
            <p><button @click="signOut" class="btn btn-link">サインアウト</button></p>
        </div>
        <div class="menuBar">
            <h3>管理メニュー</h3>
            <ul class="menu">
              <li><router-link to="/mysalonsInfo">運営からのお知らせ</router-link></li>
              <li><router-link to="/mycouncilprof">お問い合わせ</router-link></li>
              <li><router-link to="/mysalon">Q&A</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firestore'

export default {
    name: 'LeftBar',
    methods: {
        signOut: function () {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            })
        }
    }
}

</script>

<style scoped>
    .menu {
        list-style-type: none;
        padding: 0px;
    }

    h2 {
        font-size: 130%;
    }

    h3 {
        font-size: 110%;
    }

    h4 {
        font-size: 100%;
    }
</style>