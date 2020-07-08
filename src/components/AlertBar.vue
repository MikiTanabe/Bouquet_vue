<template>
    <div class="mb-2">
        <div class="borderPink col-md-10 col-8">
                <p v-if="!blnLink" class="p-0 m-0">{{ cmpStrMessage }}</p>
                <router-link :to="strUrl" v-if="blnLink">{{ cmpStrMessage }}</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AlertBar',
    data () {
        return {
            txtAlert: '',
            blnLink: false,
            strUrl: '',
            strMessage: '',
        }
    },
    props: {
        prpStrRoute: {
            type: String,
            default: ''
        },
        prpBlnLink: {
            type: Boolean,
            default: false
        },
        prpStrMessage: {
            type: String,
            default: 'お知らせはありません'
        }
    },
    computed: {
        cmpStrRoute: function () {
            return this.prpStrRoute
        },
        cmpBlnLink: function () {
            return this.prpBlnLink
        },
        cmpStrMessage: function () {
            return this.prpStrMessage
        }
    },
    watch: {
        cmpStrRoute: function ( newVal ) {
            this.strUrl = newVal
        },
        cmpBlnLink: function ( newVal ) {
            this.blnLink = newVal
        },
        cmpStrMessage: function ( newVal ) {
            this.strMessage = newVal
        }
    }
}
</script>