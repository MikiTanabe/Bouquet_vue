<template>
<div id="overlay" v-show="cmpOpenWindow">
    <div id="window">
        <p>{{ message }}</p>
        <p><button v-on:click.prevent="CloseWindow">close</button></p>
    </div>
</div>
</template>
<script>
export default {
    name: 'DelParticipant',
    data () {
        return {
            message: '参加者削除ページです'
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
            console.log('Close window.')
            this.$emit('form-closing')
        }
    }
}
</script>