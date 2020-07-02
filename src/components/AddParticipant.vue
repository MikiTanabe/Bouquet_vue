<template>
<div id="overlay" class="col-12" v-show="cmpOpenWindow">
    <div id="window">
        <h5>イベント参加者の招待</h5>
        <h6>ユーザーから追加する</h6>
        <div class="col-12 mb-2">
            <p><input type="text" v-model="txtSearch" class="col-8 mr-2">
            <button v-on:click.prevent="btnSearchClick" class="btn btn-primary">検索</button></p>
            <div id="userList" v-show="showList">
                <div class="form-group mb-1">
                    <select class="col-8 mb-0" name="joinList" size="3" multiple>
                        <option value="hana">はな / Bouquet!</option>
                    </select>
                </div>
            </div>
        </div>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="function () {console.log('依頼')}" class="btn btn-success">招待</button></p>
    </div>
</div>
</template>
<script>
export default {
    name: 'AddParticipant',
    data () {
        return {
            txtSearch: 'ユーザ名、サロン名',
            showList: false,
            arrUser: []
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
        },
        btnSearchClick: function () {
            this.showList = true
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