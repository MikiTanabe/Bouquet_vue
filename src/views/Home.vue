<template>
  <div class="container">
    <div class="row pt-2">
      <div v-if="blnAuth">
        <p>こんにちは、{{ name }}さん</p>
        <div id="flexWrapperContainer">
          <LeftBar />
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import firebase from '@/firebase/firestore'
import LeftBar from '@/components/LeftBar'
 
export default {
    data() {
        return {
            name: '',
            blnAuth: false
        }
    },
    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.name = firebase.auth().currentUser.displayName
          this.blnAuth = true
        } else {
          this.name = ''
          this.blnAuth = false
          this.$router.push('/signin')
        }
      })
    },
    components: {
      LeftBar
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

  #flexWrapperContainer {
    /* display: flex;
    align-items: flex-start; */
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 5fr;
  }
</style>
