<template>
    <div>
        <div class="flexEventContainer col-8">
            <div class="eventChild col-12 col-md-6 pb-1 pr-1">
                <div class="eventImg">
                    <img src="@/img/salon-no-image.jpg" class="img-fluid">
                </div>
                <div class="eventInfo ml-1">
                    <h6>第3回イメコン会議</h6>
                    <p>Youtubeで人気のイメージコンサルタントがオンラインで集まります</p>
                </div>
            </div>
            <div class="eventChild col-12 col-md-6 pb-1 pr-1">
                <div class="eventImg">
                    <img src="@/img/salon-no-image.jpg" class="img-fluid">
                </div>
                <div class="eventInfo ml-1">
                    <h6>親睦会</h6>
                    <p>名古屋のイメージコンサルタントの会議。オンライン中継します。</p>
                </div>
            </div>
            <div class="eventChild col-12 col-md-6 pb-1 pr-1">
                <div class="eventImg">
                    <img src="@/img/salon-no-image.jpg" class="img-fluid">
                </div>
                <div class="eventInfo ml-1">
                    <h6>2020ラピスの会 大阪</h6>
                    <p>ラピス 大阪メンバで懇親会しましょう。会場は梅田です。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EventList'
}
</script>

<style scoped>
    .flexEventContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .eventChild {
        display: flex;
        align-items: flex-start;
    }

    .eventImg {
        width: 30%;
    }
    .eventInfo {
        width: 70%;
    }
</style>