<template>
<div id="overlay" v-show="cmpOpenWindow">
    <div id="window">
        <p>{{ cmpUserName }} （{{ cmpUserSalon }}）さんの招待を取り消しますか？</p>
        <p class="txtAlert">招待取消を行うと、相手に通知を送信します。相手が承認次第招待は解除されます。</p>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="btnDelClick" class="btn btn-danger">招待取消</button></p>
    </div>
</div>
</template>
<script>
export default {
    name: 'DelParticipant',
    data () {
        return {
            message: '招待取消ページです'
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
            this.$emit('user-delete', this.cmpUserId )
            this.$emit('form-closing')
        }
    }
}
</script>
<style scoped>
    .txtAlert {
        font-size: 80%;
        color: red
    }
</style>