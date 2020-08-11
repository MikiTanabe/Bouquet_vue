<template>
    <div class="myPageContents">
        <AddParticipant :prpOpenWindow="openAddWindow" @form-closing="CloseAddWindow" @send-invite="GetInviteUsers" />
        <DelParticipant :prpOpenWindow="openDelWindow" :prpUserId="userSelected" :prpUserName="selectedName" :prpUserSalon="selectedSalon"
         @form-closing="CloseDelWindow" @user-delete="getDeleteUser" />
        <ReAddParticipant :prpOpenWindow="openReAddWindow" :prpUserId="userSelected" :prpUserName="selectedName" :prpUserSalon="selectedSalon"
         @form-closing="CloseReAddWindow" @user-reAdd="getReAddUser" />
        <NoticeEvDelete :prpOpenWindow="openNoticeDelete" :prpTxtEvName="eventData.title" @form-closing="CloseNoticeDelete" @delete-click="Delete" />
        <h2>イベント情報の編集</h2>
        <div class="myPageContentchild">
            <form>
                <!-- イベント名 -->
                <div class="form-group">
                    <label>イベント名</label>
                    <input type="text" v-model="eventData.title">
                </div>
                <!-- 開催日時 -->
                <div class="form-group">
                    <label>開催日時</label>
                    <input type="date" v-model="eventData.evdate">
                </div>
                <!-- ファイルアップロード -->
                <p>イベント画像(自動リサイズされます)</p>
                <div class="images mb-2">
                    <img :src="eventData.imgUrl" class="image-fluid">
                </div>
                <div class="form-group">
                    <label>イメージの変更：</label>
                    <input type="file" v-on:change="SelectImg">
                </div>
                <h5>イベント概要</h5>
                <div class="form-group col-12">
                    <textarea id="introduction" name="introduction" rows="8" cols="20" class="form-control" v-model="eventData.introduction"></textarea>
                </div>
                <h5>イベント参加者</h5>
                <div class="col-12 mb-3">
                    <div class="form-group mb-1">
                        <select class="col-10 mb-0" name="joinList" size="3" v-model="userSelected" @change="ListParticipantSelected">
                            <option v-for="item in participants" v-bind:key="item.user" v-bind:value="item.user">
                                {{ item.name }} / {{ item.salon }}
                                 <p v-if="item.status.preJoin">（招待中）</p>
                                 <p v-if="item.status.delete">（招待取消中）</p>
                            </option>
                        </select>
                    </div>
                    <button v-on:click.prevent="OpenAddWindow" class="btn btn-sm btn-outline-primary mr-2">招待追加</button>
                    <button v-on:click.prevent="BtnDelAddClicked" class="btn btn-sm btn-outline-danger mr-2"
                     v-bind:disabled="blnDisableBtn">{{ txtBtnDelAdd }}</button>
                </div>
                <h5>イベントURL(任意)</h5>
                <div class="form-group col-12 mb-3">
                    <p>Youtube、イベント告知ページ等</p>
                    <input type="text" v-model="eventData.txtUrl" class="col-10">
                </div>
                <button v-on:click.prevent="AddOrModify" class="btn btn-primary col-3 mr-2">保存</button>
                <button v-on:click.prevent="OpenNoticeDelete" v-bind:disabled="!blnHaveEvent" class="btn btn-danger col-3">削除</button>
            </form>
        </div>
        <p>>><router-link to="myeventinfo">一覧へ戻る</router-link></p>
    </div>
</template>
<script>
import { GetOneEventData, GetConsultantName, GetSalonName, GetSalonData} from '@/js/Data'
import { getEventImgUrl, uploadEventImgs } from '@/js/Picture'
import { getUser } from '@/js/User'
import AddParticipant from '@/components/AddParticipant'
import DelParticipant from '@/components/DelParticipant'
import ReAddParticipant from '@/components/ReAddParticipant'
import NoticeEvDelete from '@/components/NoticeEvDelete'
import { db } from '@/firebase/firestore'
import { BqDateParse, FormatDate } from '@/js/gblFunction'

export default {
    name: 'EventInfoEdit',
    data () {
        return {
            eventId: '',
            eventData: {
                title:'イベント名',
                introduction: 'イベント概要',
                consultantName: 'コンサルタント名',
                evdate: new Date(),
                salonId: 'サロンID',
                salonName: 'サロン名',
                join: [],
                preJoin: [],
                delete: [],
                imgUrl: 'noImage',
                txtUrl: 'イベントURL',
                uid: 'ユーザID'
            },
            participants: [],
            openAddWindow: false,
            openDelWindow: false,
            openReAddWindow: false,
            openNoticeDelete: false,
            blnHaveEvent: false,
            blnDisableBtn: true,
            blnReAdd: false,
            imgsSelected: null,
            userSelected: '',
            selectedName: '',
            selectedSalon: '',
            txtBtnDelAdd: '招待取消'
        }
    },
    components: {
        AddParticipant,
        DelParticipant,
        ReAddParticipant,
        NoticeEvDelete
    },
    props: {
        prpEventId: {
            type: String,
            default: ''
        }
    },
    computed: {
        cpEventId: function () {
                return this.prpEventId
        }
    },
    watch: {
        cpEventId: function ( newVal ) {
            this.eventId = newVal
        }
    },
    methods: {
        Delete: function () {
            console.log('delete')
            db.collection('events').doc(this.eventId).delete().then( () => {
                alert('イベントを削除しました')
                this.$router.push('myeventinfo')
            }).catch( error => {
                console.log('Catch Error: ', error )
            })
        },
        CreateEvent: function ( eventData ) {
            return db.collection("events").add( eventData )
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id)
                return docRef.id
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            })
        },
        ModifyEvent: function ( eventID, eventData ) {
            var eventRef = db.collection('events').doc(eventID)
            eventRef.set( eventData )
        },
        AddOrModify: function ( ) {
            try {
                    var mapEventData = this.SetMapEventInfo()
                    if ( this.blnHaveEvent ) {
                        this.ModifyEvent( this.eventId, mapEventData )
                        this.AddImg( this.eventId )
                        alert('イベント情報を更新しました')
                    } else {
                        this.CreateEvent( mapEventData ).then( evId => {
                            console.log( 'イベント作成後: ', evId )
                            this.AddImg( evId )
                        })
                        alert('イベントを新規登録しました')
                    }
            } catch ( e ) {
                alert(e.message)
            }
        },
        SelectImg: function ( img ) {
            this.imgsSelected = img.target.files
        },
        AddImg: function ( evId ) {
            if (this.imgsSelected != null) {
                uploadEventImgs( evId, this.imgsSelected ).then( url => {
                    this.eventData.imgUrl = url
                })
            }
        },
        SetMapEventInfo: function () {
            var mapEventData = {
                    title: this.eventData.title,
                    introduction: this.eventData.introduction,
                    uid: this.eventData.uid,
                    upDate: new Date(),
                    consultantName: this.eventData.consultantName,
                    date: BqDateParse( this.eventData.evdate ),
                    salonId: this.eventData.salonId,
                    salonName: this.eventData.salonName,
                    join: this.eventData.join,
                    preJoin: this.eventData.preJoin,
                    delete: this.eventData.delete,
                    imgUrl: this.eventData.imgUrl,
                    txtUrl: this.eventData.txtUrl,
                }
            return mapEventData
        },
        SetParticipantsList: function ( arrUser, status ) {
            arrUser.forEach( uid => {
                var mapParticipant = {}
                GetConsultantName( uid ).then( name => {
                    this.$set(mapParticipant, 'name', name )
                }).then( GetSalonName ( uid ).then( salon => {
                    this.$set(mapParticipant, 'salon', salon )
                })
                ).then( () => {
                    mapParticipant[ 'user' ] = uid
                    switch( status ){
                        case 'join':
                            this.$set( mapParticipant, 'status', {
                                preJoin: false,
                                delete: false
                            })
                            break
                        case 'pre-join':
                            console.log( '招待者追加', mapParticipant )
                            this.$set(mapParticipant, 'status', {
                                preJoin: true,
                                delete: false
                            })
                            break
                        case 'delete':
                            this.$set( mapParticipant, 'status', {
                                preJoin: false,
                                delete: true
                            })
                            break
                    } 
                    this.participants.push( mapParticipant )
                }).catch( error => {
                    this.$set( mapParticipant, {
                        name: 'noName',
                        salon: 'noSalon',
                        user: '',
                        status: {
                            preJoin: false,
                            delete: false
                        }
                    })
                    console.log('FailedGetGuests:', error)
                    this.participants.push( mapParticipant )
                })
            })
        },
        BtnDelAddClicked: function () {
            if ( this.blnReAdd ) {
                this.openReAddWindow = true
            } else {
                this.openDelWindow = true
            }
        },
        CloseDelWindow: function () {
            this.openDelWindow = false
        },
        CloseReAddWindow: function () {
            this.openReAddWindow = false
        },
        OpenAddWindow: function () {
            this.openAddWindow = true
        },
        CloseAddWindow: function () {
            this.openAddWindow = false
        },
        CloseNoticeDelete: function () {
            this.openNoticeDelete = false
        },
        OpenNoticeDelete: function () {
            this.openNoticeDelete = true
        },
        GetInviteUsers: function ( userList ) {
            this.AddUserList( userList ) 
        },
        AddUserList: function ( newUserList ) {
            let lenJoinUser = this.eventData.join.length
            let lenPreUser = this.eventData.preJoin.length
            let lenDelUser = this.eventData.delete.length
            newUserList.forEach( user => {
                for(var i = 0; i < lenJoinUser; i++ ){
                    if( this.eventData.join[i] == user ){
                        alert('すでに招待済のユーザーです')
                        return
                    }
                }
                for(var j = 0; j < lenPreUser; j++) {
                    if( this.eventData.preJoin[j] == user ){
                        alert('すでに招待中のユーザーです')
                        return
                    }
                }
                for(var k = 0; k < lenDelUser; k++ ){
                    if( this.eventData.delete[k] == user ){
                        alert('招待取消中のユーザーです。再度招待する場合は再招待を行ってください')
                        return
                    }
                }
                this.eventData.preJoin.push( user )
            })
            this.participants.splice(0)
            this.SetParticipantsList( this.eventData[ 'join' ], 'join' )
            this.SetParticipantsList( this.eventData[ 'preJoin' ], 'pre-join' )
            this.SetParticipantsList( this.eventData[ 'delete' ], 'delete' )
        },
        ListParticipantSelected: function () {
            for ( var i = 0; i < this.participants.length; i++ ) {
                if ( this.participants[i][ 'user' ] != this.userSelected ) {
                    continue
                } else {
                    if ( this.participants[i][ 'status' ][ 'preJoin' ] ||
                     this.participants[i][ 'status' ][ 'delete' ] ){
                        this.blnDisableBtn = false
                    } else {
                        this.blnDisableBtn = true
                    }
                    this.blnReAdd = this.participants[i][ 'status' ][ 'delete' ]
                    this.selectedName = this.participants[i][ 'name' ]
                    this.selectedSalon = this.participants[i][ 'salon' ]
                    if ( this.blnReAdd ) {
                        this.txtBtnDelAdd = '再招待'
                    } else {
                        this.txtBtnDelAdd = '招待取消'
                    }
                }
            }
        },
        getDeleteUser: function ( uid ) {
            this.DeleteUserList( uid )
        },
        getReAddUser: function ( uid ) {
            this.ReAddUserList( uid )
        },
        DeleteUserList: function ( delUser ) {
            let iDel = this.eventData[ 'preJoin' ].indexOf( delUser )
            this.eventData[ 'preJoin' ].splice( iDel, 1 )
            this.eventData[ 'delete' ].push( delUser )
            this.participants.splice(0)
            this.SetParticipantsList( this.eventData[ 'join' ], 'join' )
            this.SetParticipantsList( this.eventData[ 'preJoin' ], 'pre-join' )
            this.SetParticipantsList( this.eventData[ 'delete' ], 'delete' )
        },
        ReAddUserList: function ( reAddUser ) {
            let iReAdd = this.eventData[ 'delete' ].indexOf( reAddUser )
            this.eventData[ 'delete' ].splice( iReAdd, 1 )
            this.eventData[ 'preJoin' ].push( reAddUser )
            this.participants.splice(0)
            this.SetParticipantsList( this.eventData[ 'join' ], 'join' )
            this.SetParticipantsList( this.eventData[ 'preJoin' ], 'pre-join' )
            this.SetParticipantsList( this.eventData[ 'delete' ], 'delete' )
        }
    },
    created () {
        this.eventId = this.cpEventId
        let uid = getUser()
        GetOneEventData( this.eventId ).then( mapEventData =>{
            this.$set(this.eventData, 'title', mapEventData[ 'title' ])
            this.$set(this.eventData, 'introduction', mapEventData[ 'introduction' ])
            this.$set(this.eventData, 'consultantName', mapEventData[ 'consultantName' ])
            if ( this.eventId == '' ) {
                GetSalonData( uid ).then( mapSalon => {
                    console.log(mapSalon[ 'salonId' ])
                    this.$set(this.eventData, 'salonId', mapSalon[ 'salonId' ])
                    this.$set(this.eventData, 'uid', uid)
                    this.$set(this.eventData, 'salonName', mapSalon[ 'name' ])
                    this.$set(this.eventData, 'evdate', FormatDate( new Date, '-' ))

                })
            } else {
                this.$set(this.eventData, 'salonId', mapEventData[ 'salonId' ])
                this.$set(this.eventData, 'uid', mapEventData[ 'uid' ])
                this.$set(this.eventData, 'salonName', mapEventData[ 'salonName' ])
                this.$set(this.eventData, 'evdate', mapEventData[ 'date' ])
            }
            this.$set(this.eventData, 'join', mapEventData[ 'join' ])
            this.$set(this.eventData, 'preJoin', mapEventData[ 'preJoin' ])
            this.$set(this.eventData, 'delete', mapEventData[ 'delete' ])
            
            this.blnHaveEvent = mapEventData[ 'blnHaveEvent' ]
            getEventImgUrl( this.eventId ).then( ImgUrl => {
                this.$set(this.eventData, 'imgUrl', ImgUrl)
            })
            this.SetParticipantsList( this.eventData[ 'join' ], 'join' )
            this.SetParticipantsList( this.eventData[ 'preJoin' ], 'pre-join' )
            this.SetParticipantsList( this.eventData[ 'delete' ], 'delete' )
        })
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
        padding-bottom: 10px;
    }

</style>