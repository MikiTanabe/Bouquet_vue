<template>
    <div class="myPageContents">
        <ProfileCard  :prpMapProfile="mapData" />
        <router-link to="profile">編集ページへ戻る</router-link>
    </div>
</template>
<script>
import ProfileCard from '@/components/ProfileCard'
import { GetConsultantProfile, GetSalonName } from '@/js/Data'
import { getUser } from '@/js/User'
import { getProfileImgUrl } from '@/js/Picture'
import { FormatDate } from '@/js/gblFunction'

export default {
    name: 'ProfileSample',
    data () {
        return {
            userID: '',
            mapData: {
                name: 'noName',
                showBirth: false,
                certification: 'sampleCertification',
                introduction: 'sampleIntroduction',
                birth: FormatDate(new Date(), '-' ),
                salonName: 'sampleSalon'
            }
        }
    },
    components: {
        ProfileCard
    },
    created () {
        this.userID = getUser()
        GetSalonName( this.userID ).then( name => {
            this.$set( this.mapData, 'salonName', name )
        })
        GetConsultantProfile( this.userID ).then( mapProfile => {
            this.$set( this.mapData, 'name', mapProfile[ 'consulName' ] )
            this.$set( this.mapData, 'showBirth', mapProfile[ 'blnShowBirth' ] )
            this.$set( this.mapData, 'certification', mapProfile[ 'certification' ] )
            this.$set( this.mapData, 'introduction', mapProfile[ 'introduction' ] )
            this.$set( this.mapData, 'birth', mapProfile[ 'birth' ].substr(0, 4) )
            return mapProfile[ 'consultantID' ]
        })
        .then( consulID => {
            getProfileImgUrl( consulID ).then( url => {
                this.$set( this.mapData, 'imgUrl', url )
                console.log('sendData: ', this.mapData)
            })
        })
        
    }
}
</script>
<style scoped>
.myPageContents {
        margin-left: 20px;
    }

</style>