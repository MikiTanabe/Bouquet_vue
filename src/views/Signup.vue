<template>
    <div>
        <h2>新規アカウント登録</h2>
        <input type="text" placeholder="メールアドレス" v-model="email">
        <input type="text" placeholder="ニックネーム" v-model="username">
        <input type="password" placeholder="パスワード" v-model="password">
        <div>
            <button @click="signUp">登録</button>
        </div>
        <p>既にアカウントを持っていますか？<br>
            <router-link to="/signin">サインインはこちら</router-link>
        </p>
    </div>
</template>

<script>
import firebase from '@/firebase/firestore'

export default {
    data () {
        return {
            email: '',
            password: '',
            username: ''
        }
    },
    methods: {
        signUp: function () {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((result) => {
                result.user.updateProfile({
                    displayName:this.username
                });
                alert('アカウントを作成しました')
                this.$router.push('/singin')
            })
            .catch(error => {
                alert(error.message)
            })
        }
    }
}
</script>