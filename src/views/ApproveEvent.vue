<template>
    <div class="myPageContents">
        <NoticeJoinWindow :prpOpenWindow="openWindow" @form-closing="CloseWindow" />
        <div class="myPageContentchild">
            <h2>{{ strStatus }}</h2>
            <OneEventInfo :prpEvId="cmpEvId" />
            <p><button class="btn btn-primary col-xs-2 mr-2" v-on:click="btnApproveClick">参加承認</button>
            <button class="btn btn-danger col-xs-2">参加辞退</button></p>
        </div>
    </div>
</template>

<script>
import OneEventInfo from '@/components/OneEventInfo'
import NoticeJoinWindow from '@/components/NoticeJoinWindow'

export default {
    name: 'ApproveEvent',
    data () {
        return {
            strStatus: '',
            openWindow: false
        }
    },
    props: {
        prpEvId: {
            type: String,
            default: ''
        },
        prpEvStatus: {
            type: String,
            default: ''
        }
    },
    computed: {
        cmpEvId: function () {
            return this.prpEvId
        },
        cmpEvStatus: function () {
            return this.prpEvStatus
        }
    },
    watch: {
        cmpEvStatus: function ( newVal ) {
            if (newVal == 'preJoin') {
                this.strStatus = '参加承認依頼'
            } else {
                this.strStatus = '招待取消承認依頼'
            }
        }
    },
    methods: {
        CloseWindow: function () {
            this.openWindow = false
        },
        btnApproveClisk: function () {
            this.openWindow = true
        }
    },
    components: {
        OneEventInfo,
        NoticeJoinWindow
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

    .myPageContents {
        margin-left: 20px;
    }

    .myPageContentchild {
        padding-bottom: 15px;
    }

</style>