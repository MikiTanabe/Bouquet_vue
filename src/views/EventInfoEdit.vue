<template>
    <div class="myPageContents">
        <AddParticipant :prpOpenWindow="openAddWindow" @form-closing="CloseAddWindow" @send-invite="GetInviteUsers" />
        <DelParticipant :prpOpenWindow="openDelWindow" @form-closing="CloseDelWindow"/>
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
                        <select class="col-10 mb-0" name="joinList" size="3" multiple>
                            <option v-for="item in participants" v-bind:key="item.user">{{ item.name }} / {{ item.salon }}</option>
                        </select>
                    </div>
                    <button v-on:click.prevent="OpenAddWindow" class="btn btn-primary mr-2">追加</button>
                    <button v-on:click.prevent="OpenDelWindow" class="btn btn-danger">参加取消</button>
                </div>
                <h5>イベントURL(任意)</h5>
                <section>Youtube、イベント告知ページ等</section>
                <div class="form-group">
                    <input type="text" v-model="eventData.txtUrl">
                </div>
                <button v-on:click.prevent="AddOrModify" class="btn btn-primary mr-2">保存</button>
                <button v-on:click.prevent="Delete" class="btn btn-danger">削除</button>
            </form>
        </div>
        <p>>>一覧へ戻る</p>
    </div>
</template>
<script>
import { GetOneEventData, GetConsultantName, GetSalonName } from '@/js/Data'
import { getEventImgUrl } from '@/js/Picture'
import AddParticipant from '@/components/AddParticipant'
import DelParticipant from '@/components/DelParticipant'

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
                promoter: ['主催者'],
                join: ['参加者'],
                imgUrl: 'noImage',
                txtUrl: 'イベントURL'
            },
            participants: [],
            openAddWindow: false,
            openDelWindow: false
        }
    },
    components: {
        AddParticipant,
        DelParticipant
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
        },
        AddOrModify: function () {
            console.log('addOrModify')
        },
        SelectImg: function () {
            console.log('selectImg')
        },
        SetParticipantsList: function ( arrUser ) {
            arrUser.forEach( uid => {
                var mapParticipant = {}
                GetConsultantName( uid ).then( name => {
                    mapParticipant[ 'name' ] = name
                }).then( GetSalonName ( uid ).then( salon => {
                    mapParticipant[ 'salon' ] = salon
                })
                ).then( () => {
                    mapParticipant[ 'user' ] = uid
                    this.participants.push( mapParticipant )
                }).catch( error => {
                    mapParticipant = {
                        name: 'noName',
                        salon: 'noSalon',
                        user: ''
                    }
                    console.log('FailedGetGuests:', error)
                    this.participants.push( mapParticipant )
                })
            })
        },
        OpenDelWindow: function () {
            this.openDelWindow = true
        },
        CloseDelWindow: function () {
            this.openDelWindow = false
        },
        OpenAddWindow: function () {
            this.openAddWindow = true
        },
        CloseAddWindow: function () {
            this.openAddWindow = false
        },
        GetInviteUsers: function ( userList ) {
            console.log(userList)
        }
    },
    created () {
        this.eventId = this.cpEventId
        GetOneEventData( this.eventId ).then( mapEventData =>{
            this.$set(this.eventData, 'title', mapEventData[ 'title' ])
            this.$set(this.eventData, 'introduction', mapEventData[ 'introduction' ])
            this.$set(this.eventData, 'consultantName', mapEventData[ 'consultantName' ])
            this.$set(this.eventData, 'evdate', mapEventData[ 'date' ])
            this.$set(this.eventData, 'salonId', mapEventData[ 'salonId' ])
            this.$set(this.eventData, 'salonName', mapEventData[ 'salonName' ])
            this.$set(this.eventData, 'join', mapEventData[ 'join' ])
            getEventImgUrl( this.cpEventId ).then( ImgUrl => {
                this.$set(this.eventData, 'imgUrl', ImgUrl)
            })
            this.SetParticipantsList( this.eventData[ 'join' ] )
            /* TODO:pre-joinのデータを追加する */
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