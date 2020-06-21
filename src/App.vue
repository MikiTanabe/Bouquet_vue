<template>
  <div id="app">
    <header>
        <div class="container">
            <div class="row">
                <div class="pt-1 col-12 col-sm-6">
                    <p class="clGray smallTxt">イメージコンサルティングサロン検索サイト</p>
                </div>
                <div class="col-12" id="flexHeaderContainer">
                    <div class="col-3 flexHeaderChild clViolet largeTxt">
                        <router-link to="/">Bouquet!</router-link>
                    </div>
                    <div class="col-3 flexHeaderChild flexRight clViolet">
                        <!-- {{ userName }} -->▶<router-link v-bind:to="strLogin">{{ myPageMsg }}</router-link> ▶<router-link to="help">ヘルプ</router-link>
                    </div>
                </div>
            </div>
        </div>
      </header>
    <div id="mainWrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase/firestore'

export default {
  name: 'App',
  data() {
    return {
      userName: '',
      myPageMsg: 'ログイン／新規登録',
      strLogin: '/signin'
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userName = firebase.auth().currentUser.displayName + '様 : '
        this.myPageMsg = 'マイページ'
        this.strLogin = '/home'
      } else {
        this.userName = ''
        this.myPageMsg = 'ログイン／新規登録'
        this.strLogin = '/signin'
      }
    })
  }
}
</script>

<style lang="scss">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
