<template>
<div id="overlay" class="col-12" v-show="cmpOpenWindow">
    <div id="window">
        <h5>イベントへの参加を承認しますか</h5>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="btnInviteClick" class="btn btn-success">承認</button></p>
    </div>
</div>
</template>
<script>

export default {
    name: 'AddParticipant',
    data () {
        return {
            rtnUid: ''
        }
    },
    props: {
        prpOpenWindow: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        cmpOpenWindow: function () {
            return this.prpOpenWindow
        }
    },
    methods: {
        CloseWindow: function () {
            this.$emit('form-closing')
        },
        btnInviteClick: function () {
            this.$emit('send-invite' )
            this.$emit('form-closing')
        }
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

    ul {
        list-style: none;
        padding: 0px;
        margin: 5px;
    }
</style>