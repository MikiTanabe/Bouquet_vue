<template>
    <div class="myPageContents">
        <h2>イベント情報の編集</h2>
        <div class="myPageContentchild">
            <form>
                <!-- イベント名 -->
                <div class="form-group">
                    <!-- <p>{{ cpEventId }}</p> -->
                    <label>イベント名</label>
                    <input type="text" v-model="eventData.title">
                </div>
                <!-- 開催日時 -->
                <div class="form-group">
                    <label>開催日時</label>
                    <input type="date" :value="eventData.evdate">
                </div>
                <!-- ファイルアップロード -->
                <p>イベント画像(自動リサイズされます)</p>
                <div class="images">
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
                <div class="form-group col-12">
                    <select class="col-6" name="joinList" size="3" multiple>
                        <option value="1">はな/Bouquet</option>
                        <option value="2">よしこ/サロン</option>
                    </select>
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
import { GetOneEventData } from '@/js/Data'
import { getEventImgUrl } from '@/js/Picture'

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
                eventData: ['主催者'],
                imgUrl: 'noImage',
                txtUrl: 'イベントURL'
            }
        }
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
        }
    },
    created () {
        this.eventId = this.cpEventId
        console.log('OneEventID: ' + this.eventId)
        GetOneEventData( this.eventId ).then( mapEventData =>{
            console.log(mapEventData)
            this.$set(this.eventData, 'title', mapEventData[ 'title' ])
            this.$set(this.eventData, 'introduction', mapEventData[ 'introduction' ])
            this.$set(this.eventData, 'consultantName', mapEventData[ 'consultantName' ])
            this.$set(this.eventData, 'evdate', mapEventData[ 'date' ])
            this.$set(this.eventData, 'salonId', mapEventData[ 'salonId' ])
            this.$set(this.eventData, 'salonName', mapEventData[ 'salonName' ])
            this.$set(this.eventData, 'join', mapEventData[ 'join' ])
            getEventImgUrl( this.cpEventId ).then( ImgUrl => {
                this.$set(this.eventData, 'imgUrl', ImgUrl)
                console.log(this.eventData)
            })
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