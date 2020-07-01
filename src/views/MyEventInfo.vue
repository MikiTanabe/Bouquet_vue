<template>
    <div class="myPageContents">
        <h2>主催イベント情報の管理</h2>
        <div class="myPageContentchild">
            <!-- イベントリスト -->
            <EventListEditTb />
        </div>
        <h2>参加予定イベントの管理</h2>
    </div>
</template>
<script>
import EventListEditTb from '@/components/EventListEditTb'

export default {
    name: 'MyEventInfo',
    components: {
        EventListEditTb
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