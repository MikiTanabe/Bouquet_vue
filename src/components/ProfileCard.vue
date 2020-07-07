<template>
        <div class="flexProfileContainer">
            <div class="profileChild col-md-3 col-xs-12">
                <div class="profileImg">
                    <img :src="imgUrl" class="img-fluid">
                </div>
            </div>
            <div class="profileChild col-md-8 col-xs-12">
                <h2 class="name">{{ name }}</h2>
                <div class="introduction">
                    <section class="p-2">{{ introduction }}</section>
                </div>
                <div>
                    <p class="data col-md-3 col-xs-12 text-center">DATA</p>
                    <div class="dataContainer pl-2">
                        <p v-if="showBirth">誕生年: {{ birth }}年</p>
                        <p>資格: {{ certification }}</p>
                        <p>サロン: {{ salonName }}</p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { FormatDate } from '@/js/gblFunction'

export default {
    name: 'ProfileCard',
    data () {
        return {
            userID: '',
            name: 'sampleName',
            showBirth: false,
            certification: '',
            introduction: '',
            birth: FormatDate( new Date(), '-' ),
            imgUrl: '',
            salonName: ''
        }
    },
    props: {
        prpMapProfile: {
            type: Object,
            default: () => ({
                name: 'sampleName',
                showBirth: false,
                certification: 'sample',
                introduction: 'sampleIntroduction',
                birth: FormatDate( new Date(), '-' ),
                imgUrl: '',
                salonName: 'sampleSalon'
            })
        }
    },
    computed: {
        cmpMapProfile: function () {
            return this.prpMapProfile
        }
    },
    watch: {
        cmpMapProfile: function ( newval ) {
            this.name = newval[ 'name' ]
            this.showBirth = newval[ 'showBirth' ]
            this.certification = newval[ 'certification' ]
            this.introduction = newval[ 'introduction' ]
            this.imgUrl = newval[ 'imgUrl' ]
            this.salonName = newval[ 'salonName' ]
            this.birth = newval[ 'birth' ]
        }
    },
    created () {
        this.name = this.cmpMapProfile[ 'name' ]
        this.showBirth = this.cmpMapProfile[ 'showBirth' ]
        this.certification = this.cmpMapProfile[ 'certification' ]
        this.introduction = this.cmpMapProfile[ 'introduction' ]
        this.imgUrl = this.cmpMapProfile[ 'imgUrl' ]
        this.salonName = this.cmpMapProfile[ 'salonName' ]
        this.birth = this.cmpMapProfile[ 'birth' ]
    }
}
</script>

<style scoped>
    .flexProfileContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .name {
        border-bottom: 1px solid black;
    }

    .data {
        background-color: black;
        color: white;
        font-size: 150%;
    }

    .profileChild {
        margin: 5px;
    }
    .dataContainer {
        border-left: 1px solid black;
    }

    .introduction {
        color: crimson
    }

    .profileImg {
        margin: 0 auto;
    }
</style>