<template>
<div id="overlay" v-show="cmpOpenWindow">
    <div id="window">
        <p>{{ cmpUserName }} （{{ cmpUserSalon }}）さんの招待を取り消しますか？</p>
        <p class="txtAlert">再招待を行うと、相手に通知を送信します。相手が承認後、参加状態になります。</p>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="btnDelClick" class="btn btn-primary">再招待</button></p>
    </div>
</div>
</template>
<script>
export default {
    name: 'ReAddParticipant',
    data () {
        return {
            //message: '招待取消ページです'
        }
    },
    props: {
        prpOpenWindow: {
            type: Boolean,
            default: false,
        },
        prpUserId: {
            type: String,
            default: ''
        },
        prpUserName: {
            type: String,
            default: 'noName'
        },
        prpUserSalon: {
            type: String,
            default: 'noSalon'
        }
    },
    computed: {
        cmpOpenWindow: function () {
            return this.prpOpenWindow
        },
        cmpUserId: function () {
            return this.prpUserId
        },
        cmpUserName: function () {
            return this.prpUserName
        },
        cmpUserSalon: function () {
            return this.prpUserSalon
        }
    },
    methods: {
        CloseWindow: function () {
            this.$emit('form-closing')
        },
        btnDelClick: function () {
            this.$emit('user-reAdd', this.cmpUserId )
            this.$emit('form-closing')
        }
    }
}
</script>
<style scoped>
    .txtAlert {
        font-size: 80%;
        color: blue
    }
</style>