<template>
    <div class="myPageContents">
        <div class="myPageContentchild">
            <h2>イベント招待・招待取消の一覧</h2>
            <!-- イベント承認待ち一覧 -->
            <ApproveEventList />
        </div>
        <div class="myPageContentchild">
            <h2>主催イベント情報の管理</h2>
            <!-- イベントリスト -->
            <EventListEditTb />
        </div>
        <div class="myPageContentchild">
            <h2>参加予定イベントの管理</h2>
        </div>
    </div>
</template>
<script>
import EventListEditTb from '@/components/EventListEditTb'
import ApproveEventList from '@/components/ApproveEventList'

export default {
    name: 'MyEventInfo',
    components: {
        EventListEditTb,
        ApproveEventList
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