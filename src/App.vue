<template>
  <div id="app">
    <header>
        <div class="container">
            <div class="row">
              <div class="pt-1 col-12 col-sm-6">
                <p class="clGray smallTxt">イメージコンサルティングの動画・イベント交流サイト</p>
              </div>
              <div class="col-12" id="flexHeaderContainer">
                <div class="col-3 flexHeaderChild clViolet largeTxt">
                  <router-link to="/"><img src="@/img/logo.png" class="image-fluid"></router-link>
                </div>
                <div class="col-3 flexHeaderChild flexRight clViolet">
                  ▶<router-link v-bind:to="strLogin">{{ myPageMsg }}</router-link> ▶<router-link to="help">ヘルプ</router-link>
                </div>
              </div>
            </div>
        </div>
      </header>
    <div id="mainWrapper">
      <router-view/>
      <!-- <div>ロゴは <a href="https://www.designevo.com/jp/logo-maker/" title="無料オンラインロゴメーカー">DesignEvo</a> ロゴメーカーさんに作られる</div> -->
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
        this.strLogin = '/home/mypagetop'
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

</style>
