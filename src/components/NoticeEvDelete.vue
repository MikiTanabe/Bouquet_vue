<template>
<div id="overlay" class="col-12" v-show="cmpOpenWindow">
    <div id="window">
        <h5>イベントの削除</h5>
        <div class="col-12 mb-2">
            <p>イベント「{{ cmpTxtEvName }}」を削除します。よろしいですか？</p>
        </div>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="btnDeleteClick" class="btn btn-success">削除</button></p>
    </div>
</div>
</template>
<script>

export default {
    name: 'NoticeEvDelete',
    data () {
        return {
            txtSearch: 'ユーザ名、サロン名',
            showList: false,
            arrUserList: [],
            arrSelected: []
        }
    },
    props: {
        prpOpenWindow: {
            type: Boolean,
            default: false
        },
        prpTxtEvName: {
            type: String,
            default: ''
        }
    },
    computed: {
        cmpOpenWindow: function () {
            return this.prpOpenWindow
        },
        cmpTxtEvName: function () {
            return this.prpTxtEvName
        }
    },
    methods: {
        CloseWindow: function () {
            this.$emit('form-closing')
        },
        btnDeleteClick: function () {
            this.$emit('delete-click')
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