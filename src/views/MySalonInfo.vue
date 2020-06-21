<template>
    <div class="container">
        <div class="row pt-2">
            <div v-if="blnAuth">
                <p>こんにちは、{{ name }}さん</p>
                <div id="flexWrapperContainer">
                <LeftBar />
                <SalonInfoPanel />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '@/firebase/firestore'
import LeftBar from '@/components/LeftBar'
import SalonInfoPanel from '@/components/SalonInfoPanel'

export default {
    name: 'MySalonInfo',
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
    methods: {
        signOut: function () {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            })
        }
    },
    components: {
        LeftBar,
        SalonInfoPanel
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
    display: flex;
    align-items: flex-start;
  }
</style>

