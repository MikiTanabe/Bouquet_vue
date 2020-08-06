<template>
    <div class="myPageContents">
        <NoticeJoinWindow :prpOpenWindow="openAddWindow" @form-closing="CloseApproveWindow" @send-invite="GetInvite" />
        <NoticeDelWindow :prpOpenWindow="openDelWindow" @form-closing="CloseDelWindow" @send-Delete="GetDelete" />
        <NoticeDecWindow :prpOpenWindow="openDecWindow" @form-closing="CloseDecWindow" @send-Delete="GetDecline" />
        <div class="myPageContentchild">
            <h2>{{ strStatus }}</h2>
            <OneEventInfo :prpEvId="cmpEvId" />
            <p><button class="btn btn-primary col-xs-2 mr-2" v-if="blnApprove" v-on:click="btnApproveClick">参加承認</button>
            <button class="btn btn-danger col-xs-2 mr-2" v-if="blnApprove" v-on:click="btnDeclineClick">招待辞退</button>
            <button class="btn btn-primary col-xs-2" v-if="!blnApprove" v-on:click="btnDelClick">招待取消承認</button></p>
        </div>
    </div>
</template>

<script>
import OneEventInfo from '@/components/OneEventInfo'
import NoticeJoinWindow from '@/components/NoticeJoinWindow'
import NoticeDelWindow from '@/components/NoticeDelWindow'
import NoticeDecWindow from '@/components/NoticeDecWindow'
import { GetOneEventData } from '@/js/Data'
import { getUser } from '@/js/User'
import { db } from '@/firebase/firestore'

export default {
    name: 'ApproveEvent',
    data () {
        return {
            strStatus: '',
            blnApprove: false,
            openAddWindow: false,
            openDelWindow: false,
            openDecWindow: false
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
    created () {
        if ( this.cmpEvStatus == 'preJoin' ) {
            this.strStatus = '参加承認依頼'
            this.blnApprove = true
        } else {
            this.strStatus = '招待取消承認依頼'
            this.blnApprove = false
        }
    },
    methods: {
        CloseApproveWindow: function () {
            this.openAddWindow = false
        },
        btnApproveClick: function () {
            this.openAddWindow = true
        },
        CloseDelWindow: function () {
            this.openDelWindow = false
        },
        btnDelClick: function () {
            this.openDelWindow = true
        },
        CloseDecWindow: function () {
            this.openDecWindow = false
        },
        btnDeclineClick: function () {
            this.openDecWindow = true
        },
        GetInvite: function () {
            let uid = getUser()
            GetOneEventData( this.cmpEvId ).then( mapEvent => {
                let arrPreJoin = mapEvent[ 'preJoin' ]
                let arrJoin = mapEvent[ 'join' ]

                for ( var i = 0; i < arrPreJoin.length; i++ ) {
                    if ( arrPreJoin[i] == uid ) {
                        arrPreJoin.splice( i, 1 )
                        arrJoin.push( uid )
                        this.UpdAddGuest( arrPreJoin, arrJoin )
                        alert('参加承認しました')
                    }
                }
            })
        },
        GetDelete: function () {
            let uid = getUser()
            GetOneEventData( this.cmpEvId ).then( mapEvent => {
                let arrDelete = mapEvent[ 'delete' ]

                for ( var i = 0; i < arrDelete.length; i++ ) {
                    if ( arrDelete[i] == uid ) {
                        arrDelete.splice( i, 1 )
                        this.UpdDelGuest( arrDelete )
                        alert('招待取消を承認しました')
                    }
                }
            })
        },
        GetDecline: function () {
            let uid = getUser()
            GetOneEventData( this.cmpEvId ).then( mapEvent => {
                let arrDecline = mapEvent[ 'preJoin' ]

                for ( var i = 0; i < arrDecline.length; i++ ) {
                    if ( arrDecline[i] == uid ) {
                        arrDecline.splice( i, 1 )
                        this.UpdDecGuest( arrDecline )
                        alert('招待を辞退しました')
                    }
                }
            })
        },
        UpdAddGuest: function ( arrPreJoin, arrJoin ) {
            let evRef = db.collection('events').doc( this.cmpEvId )
            evRef.update({
                preJoin: arrPreJoin,
                join: arrJoin
            })
        },
        UpdDelGuest: function ( arrDelete ) {
            let evRef = db.collection('events').doc( this.cmpEvId )
            evRef.update({
                delete: arrDelete
            })
        },
        UpdDecGuest: function ( arrDecline ) {
            let evRef = db.collection('events').doc( this.cmpEvId )
            evRef.update({
                preJoin: arrDecline
            })
        }
    },
    components: {
        OneEventInfo,
        NoticeJoinWindow,
        NoticeDelWindow,
        NoticeDecWindow
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