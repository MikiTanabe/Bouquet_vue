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
                    <select class="col-8 mb-0" name="joinList" size="3" v-model="arrSelected" multiple>
                        <option v-for="item in arrUserList" v-bind:key="item.id" v-bind:value="item.id">{{ item.name }} / {{ item.salon }}</option>
                    </select>
                </div>
            </div>
        </div>
        <p><button v-on:click.prevent="CloseWindow" class="btn btn-outline-secondary mr-2">戻る</button>
        <button v-on:click.prevent="btnInviteClick" class="btn btn-success">招待</button></p>
    </div>
</div>
</template>
<script>
import { GetUserList } from '@/js/Data'

export default {
    name: 'AddParticipant',
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
        btnSearchClick: function () {
            this.arrUserList.splice(0)
            GetUserList( this.txtSearch ).then( arrUser => {
                arrUser.forEach( user => {
                    Object.keys( user ).forEach( key =>{
                        this.arrUserList.push(user[key])
                    })
                })
                this.showList = true
            }).catch( () => {
                this.showList = false
            })
        },
        btnInviteClick: function () {
            this.$emit('send-invite', this.arrSelected )
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