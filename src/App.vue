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
                        Bouquet!
                    </div>
                    <div class="col-3 flexHeaderChild bg-success">
                        検索
                    </div>
                    <div class="col-3 flexHeaderChild flexRight clViolet">
                        ログイン／新規登録
                    </div>
                    <!-- <div id="nav">
                      <router-link to="/">Top</router-link>
                    </div> -->
                </div>
            </div>
        </div>
      </header>
    <div id="mainWrapper">
      <router-view/>
    </div>
  </div>
</template>

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
