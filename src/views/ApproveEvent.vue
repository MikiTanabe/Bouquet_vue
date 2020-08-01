<template>
    <div class="myPageContents">
        <NoticeJoinWindow :prpOpenWindow="openWindow" @form-closing="CloseWindow" @send-invite="GetInvite" />
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
import { GetOneEventData } from '@/js/Data'
import { getUser } from '@/js/User'
import { db } from '@/firebase/firestore'

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
        btnApproveClick: function () {
            this.openWindow = true
        },
        GetInvite: function () {
            let uid = getUser()
            GetOneEventData( this.cmpEvId ).then( mapEvent => {
                //console.log(mapEvent[ 'preJoin' ])
                let arrPreJoin = mapEvent[ 'preJoin' ]
                let arrJoin = mapEvent[ 'join' ]

                for ( var i = 0; i < arrPreJoin.length; i++ ) {
                    if ( arrPreJoin[i] == uid ) {
                        console.log( '承認ID: ', arrPreJoin[i] )
                        //TODO: preJoinからuserIDを消し、joinにuserIDを追加してdb更新する
                        console.log( 'Delete: ', arrJoin[i] )
                        arrPreJoin.splice( i, 1 )
                        arrJoin.push( uid )
                    }
                }
            })
        },
        UpDateEvData: function ( arrPreJoin, arrJoin ) {
            console.log(arrJoin)
            console.log(arrPreJoin)
            let evRef = db.collection('events').doc( this.cmpEvId )
            evRef.update({
                arrPreJoin
            })
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